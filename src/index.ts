import express from "express";
import morgan from "morgan";

import * as todoRouter from "./routes/todo";
import * as healthRouter from "./routes/health";

const app = express();

app.use(express.json());
app.use(morgan("common"));

app.use("/api/v1/todo", todoRouter.default);
app.use("/api/v1/health", healthRouter.default);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Application started, listening on ${process.env.PORT || 3000}`);
});
