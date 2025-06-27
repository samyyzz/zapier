import { Kafka } from "kafkajs";
import { Prisma, prisma } from "@zap/db/prisma";
import { parse } from "./parser";
import { sendEmail } from "./email";
import { sendSol } from "./solana";

const kafka = new Kafka({
  clientId: "outbox-pattern-consumer",
  brokers: ["localhost:9092"],
});

const TOPIC_NAME = "zap-events";

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  consumer.connect();
  while (true) {
    await consumer.subscribe({
      topic: TOPIC_NAME,
      fromBeginning: true,
    });
    await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        });
        if (!message.value?.toString()) {
          console.log("Can't send Empty msg");
          return;
        }
        const parsedValue = JSON.parse(message?.value.toString());
        const zapRunId = parsedValue.zapRunId;
        const stage = parsedValue.stage;

        const zapRunDetails = await prisma.zapRun.findFirst({
          where: {
            id: zapRunId,
          },
          include: {
            zap: {
              include: {
                actions: {
                  include: {
                    type: true,
                  },
                },
              },
            },
          },
        });

        const currentAction = zapRunDetails?.zap.actions.find(
          (act) => act.sortingOrder === stage
        );

        const zapRunMetadata = zapRunDetails?.metadata;
        if (!currentAction) {
          console.log("Current action not found !");
          return;
        }
        if (currentAction.type.id === "act01") {
          const amount = parse(
            (currentAction.metadata as Prisma.JsonObject)?.amount as string,
            zapRunMetadata
          );
          const address = parse(
            (currentAction.metadata as Prisma.JsonObject)?.address as string,
            zapRunMetadata
          );
          console.log(`Sending: SOL of ${amount} to address ${address}`);
          await sendSol(address, amount);
        }

        if (currentAction.type.id === "act02") {
          console.log("Sending out an email");
          // send email logic
          const body = parse(
            (currentAction.metadata as Prisma.JsonObject)?.body as string,
            zapRunMetadata
          );
          const to = parse(
            (currentAction.metadata as Prisma.JsonObject)?.email as string,
            zapRunMetadata
          );
          console.log(`Sending: email to - ${to} , body - ${body}`);
          await sendEmail(to, "", "", body);
        }

        await new Promise((r) => setTimeout(r, 500));

        const lastStage = (zapRunDetails?.zap.actions.length || 1) - 1;
        if (!lastStage === stage) {
          const producer = kafka.producer();
          await producer.connect();

          producer.send({
            topic: TOPIC_NAME,
            messages: [
              {
                value: JSON.stringify({ zapRunId, stage: stage + 1 }),
              },
            ],
          });
        }
        console.log("----- Processing Done -----");

        consumer.commitOffsets([
          {
            topic: TOPIC_NAME,
            partition: partition,
            offset: (parseInt(message.offset) + 1).toString(),
          },
        ]);
      },
    });
  }
}

main();
