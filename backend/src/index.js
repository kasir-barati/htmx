// @ts-check

import express from "express";
import cors from "cors";
import { buildTodosList } from "./build-todos-list.js";
import { todoRepo } from "./todos.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post("/todos", (req, res) => {
  /**@type {{newTodo: string }} */
  const { newTodo } = req.body;

  const todos = todoRepo.create(newTodo);

  res.set("content-type", "text/html");
  res.status(201).send(buildTodosList(todos));
});
app.get("/todos", (req, res) => {
  const todos = todoRepo.read();

  res.set("content-type", "text/html");
  res.status(200).send(buildTodosList(todos));
});
app.put("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todos = todoRepo.update(id);

  res.set("content-type", "text/html");
  res.status(200).send(buildTodosList(todos));
});
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const todos = todoRepo.delete(id);

  res.set("content-type", "text/html");
  res.status(200).send(buildTodosList(todos));
});

app.listen(
  3000,
  "localhost",
  console.log.bind(this, "Server is up and running on port 3000")
);
