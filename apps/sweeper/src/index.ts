import { Kafka } from "kafkajs";
import { prisma } from "@zap/db/prisma";

const kafka = new Kafka({
  clientId: "outbox-pattern-producer",
  brokers: ["localhost:9092"],
});
const TOPIC_NAME = "zap-events";

async function main() {
  const producer = kafka.producer();
  await producer.connect();

  while (true) {
    const RowsToSweep = await prisma.zapRunOutBox.findMany({
      where: {},
      take: 10,
    });
    producer.send({
      topic: TOPIC_NAME,
      messages: RowsToSweep.map((row) => {
        return {
          value: JSON.stringify({ zapRunId: row.zapRunId, stage: 0 }),
        };
      }),
    });
  }
}

main();
