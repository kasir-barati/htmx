// @ts-check

import express from "express";
import cors from "cors";
import { todoRoutes } from "./routes/todos.route.js";
import { userRoutes } from "./routes/user.route.js";
import { loadEnv } from "./utils/env.util.js";

loadEnv();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

app.listen(
  3000,
  "localhost",
  console.log.bind(this, "Server is up and running on port 3000")
);
