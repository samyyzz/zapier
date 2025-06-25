import express from "express";
import { prisma } from "@zap/db/prisma";
import { WEBHOOK_URL } from "./config";

const app = express();
app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const { userId, zapId } = req.params;
  const body = req.body;

  // store data in db using transactional outbox pattern
  await prisma.$transaction(async (tx) => {
    const zapRun = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });
    await tx.zapRunOutBox.create({
      data: {
        zapRunId: zapRun.id,
      },
    });
  });
  res.json({ message: "Webhook created a transactional outbox pattern data" });
});

app.listen(() => {
  console.log(`Webhook Server running on : ${WEBHOOK_URL}`);
});
