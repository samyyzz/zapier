import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "outbox-pattern-sweeeper",
  brokers: ["localhost:9092"],
});
const TOPIC_NAME = "zap-events";
const prismaClient = new PrismaClient();

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (true) {
    const RowsToSweep = await prismaClient.zapRunOubox.findMany({
      where: {},
      take: 10,
    });
    producer.send({
      topic: TOPIC_NAME,
      messages: RowsToSweep.map((row) => {
        return {
          value: row.zapRunId,
        };
      }),
    });
  }
}

main();
