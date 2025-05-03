import { Router } from "express";
import { prisma } from "@zap/db/prisma";

const router = Router();

router.get("/available", async (req, res) => {
  const availableTriggers = await prisma.availableTriggers.findMany({});
  res.json({ triggers: availableTriggers });
});

export const triggerRouter = router