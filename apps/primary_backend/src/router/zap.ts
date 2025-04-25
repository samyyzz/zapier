import { Router } from "express";
import { authMiddleware } from "../auth/middleware";
import { CreateZapSchema } from "../types";
import { prisma } from "@zap/db/prisma";

const router = Router();

//POST create-zap
router.post("/", authMiddleware, async (req, res) => {
  const parsedBody = CreateZapSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(411).json({
      message: "Failed to validate",
    });
  }
  try {
    if(parsedBody.data){
      res.json({message:"ada"})
    const zapId = await prisma.$transaction(async (tx) => {
      const zap = await tx.zap.create({
        data: {
          userId: req.userId,
          triggerId: "",
          actions: {
            create: parsedBody.data?.actions.map((x, index) => ({
              typeId: x.availableActionId,
              sortingOrder: index,
            })),
          },
        },
      });
      const trigger = await tx.trigger.create({
        data: {
          // userId: req.userId,
          typeId: parsedBody.data?.availabletriggerId,
          zapId: zap.id,
        },
      });
      await tx.zap.update({
        where: {
          id: zap.id,
        },
        data: {
          triggerId: trigger.id,
        },
      });
      return zap.id;
    });
    res.json({
      zapId,
    });
  }else{
    res.status(411).json({
      message: "Sorry ! You are not authorized ",
    });
  }

  } catch (error) {
    res.status(411).json({
      message: "Sorry ! Failed to create zap.",
    });
  }

});

//GET all-zaps
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const myZaps = await prisma.zap.findMany({
      where: {
        userId,
      },
      include: {
        actions: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });
    res.json({
      zaps: myZaps,
    });
  } catch (error) {
    res.status(411).json({
      message: "No zap found - 0",
    });
  }
});

//GET zapId
router.get("/:zapId", authMiddleware, async (req, res) => {
  const zapId = req.params.zapId;
  const userId = req.userId;

  try {
    const zap = await prisma.zap.findFirst({
      where: {
        userId,
        id :zapId,
      },
      include: {
        actions: {
          include: {
            type: true,
          },
        },
        trigger: {
          include: {
            type: true,
          },
        },
      },
    });
    res.json({
      zap,
    });
  } catch (error) {
    res.status(411).json({
      message: `No zap found with id:${zapId}`,
    });
  }
});

export const zapRouter = router;