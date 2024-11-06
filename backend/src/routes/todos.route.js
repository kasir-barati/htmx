// @ts-check
import { Router } from "express";
import { buildTodosList } from "../utils/build-todos-list.js";
import { todoRepo } from "../repositories/todo.repository.js";

export const todoRoutes = Router();

todoRoutes.post("/", (req, res) => {
  /**@type {{newTodo: string }} */
  const { newTodo } = req.body;

  const todos = todoRepo.create(newTodo);

  res.set("content-type", "text/html");
  res.status(201).send(buildTodosList(todos));
});
todoRoutes.get("/", (req, res) => {
  const todos = todoRepo.read();

  res.set("content-type", "text/html");
  res.status(200).send(buildTodosList(todos));
});
todoRoutes.put("/:id", (req, res) => {
  const id = req.params.id;
  const todos = todoRepo.update(id);

  res.set("content-type", "text/html");
  res.status(200).send(buildTodosList(todos));
});
todoRoutes.delete("/:id", (req, res) => {
  const id = req.params.id;
  const todos = todoRepo.delete(id);

  res.set("content-type", "text/html");
  res.status(200).send(buildTodosList(todos));
});
