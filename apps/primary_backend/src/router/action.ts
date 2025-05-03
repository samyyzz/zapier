import { Router } from "express";
import { prisma } from "@zap/db/prisma";

const router = Router();

router.get("/available", async (req, res) => {
  const availableActions = await prisma.availableActions.findMany({});
  res.json({ actions: availableActions });
});

export const actionRouter = router;
