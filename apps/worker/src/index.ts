import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "outbox-pattern-worker",
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
          value: message.value.toString(),
        });
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
