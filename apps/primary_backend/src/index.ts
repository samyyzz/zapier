import express from "express";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";
import cors from "cors";
import {prisma} from "@zap/db/prisma";

const app = express()
app.use(express.json())
app.use(cors())
app.use("/", async (req,res)=> {
    console.log("prismaaaaaaa:", prisma)
    res.send({
        prisma : prisma
    })
})
const port = process.env.PRIMARY_BACKEND_PORT || "3000"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/zap", zapRouter)

app.listen(port, ()=> {
    console.log("Primary-Backend running on :", `http://localhost:${port}`)
})