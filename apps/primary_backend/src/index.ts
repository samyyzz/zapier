import express from "express";
import { userRouter } from "./router/user";
import { zapRouter } from "./router/zap";
import cors from "cors";
import { triggerRouter } from "./router/trigger";
import { actionRouter } from "./router/action";
import { PRIMARY_BACKEND_PORT } from "./config";

const app = express();
app.use(express.json());
app.use(cors());

const port = PRIMARY_BACKEND_PORT;

app.use("/api/v1/user", userRouter);
app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);

app.listen(port, () => {
  console.log("Primary-Backend running on :", `http://localhost:${port}`);
});
