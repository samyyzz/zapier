import express from "express";

const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const { userId, zapId } = req.params;
  const body = req.body;

  // store data in db using transactional outbox pattern
  await prismaClient.$transaction(async (tx) => {
    const zapRun = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });
    await tx.zapRunOubox.create({
      data: {
        zapId: zapRun.id,
      },
    });
  });
  res.json({ message: "Webhook created a transactional outbox pattern data" });
});
