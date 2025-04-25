import { Router } from "express";
import { SigninSchema, SignupSchema } from "../types";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../auth/middleware";
import {prisma} from "@zap/db/prisma";
const router = Router();

//POST signup
router.post("/signup", async (req, res) => {
  const parsedBody = SignupSchema.safeParse(req.body);
  if (!parsedBody.success ) {
    res.status(411).json({ message: "Failed to validate body !" });
  }
  const userExist = await prisma.user.findMany({
    where: {
      email: parsedBody.data?.email,
    },
  });
  if (userExist) {
    res.status(411).json({
      message: "User already exist, try another email",
    });
  }
  try{
    if(parsedBody.data){
      const newUser = await prisma.user.create({
        data: {
          name: parsedBody.data.name,
          email: parsedBody.data.email,
          password: parsedBody.data.password,
        },
      });
      const token = jwt.sign({ id: newUser.id }, JWT_SECRET);
      res.json({
        message: "User account created successfully.",
        verification: "Check your email and verify now !",
        token,
      });
    }else{
      res.status(400).json({message: "No data received from user !"})
    }
  }catch(error){
    res.status(411).json({message:"Failed to signup",error})
  }


});

//POST signin
router.post("/signin", authMiddleware, async (req, res) => {
  const parsedBody = SigninSchema.safeParse(req.body);
  if (!parsedBody.success) {
    res.status(411).json({
      message: "Failed to validate !",
    });
  }
  try {
    if(parsedBody.data){
      const myUser = await prisma.user.findFirst({
        where: {
          email: parsedBody.data.email,
          password: parsedBody.data.password,
        },
      });
      if (!myUser) {
        res.status(411).json({
          message: "No user Found with this credentials",
        });
      }
      const token = jwt.sign({ id: myUser!.id }, JWT_SECRET);
      res.json({
        token,
      });

    }else{
      res.status(400).json({message: "No data received from user !"})
    }
  }catch(error){
    res.status(411).json({message:"Failed to signup",error})
  }
});

//GET userProfile
router.get("/user", async (req, res) => {
  const id = req.userId;
  try {
    const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
        select: {
          name: true,
          email: true,
        },
      });
      res.json({user})
  } catch (error) {
    res.status(411).json({
        message:"Failed to get user data !"
    })
  }
});

export const userRouter = router;
