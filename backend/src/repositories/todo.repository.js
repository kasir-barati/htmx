// @ts-check

import { randomUUID } from "crypto";

export const todoRepo = {
  _data: [
    {
      id: randomUUID(),
      title: "Finish AI project",
      completed: false,
    },
    {
      id: randomUUID(),
      title: "Review JavaScript notes",
      completed: false,
    },
    {
      id: randomUUID(),
      title: "Buy groceries",
      completed: false,
    },
    {
      id: randomUUID(),
      title: "Walk the dog",
      completed: true,
    },
    {
      id: randomUUID(),
      title: "Read AI research papers",
      completed: false,
    },
    {
      id: randomUUID(),
      title: "Plan weekend trip",
      completed: false,
    },
    {
      id: randomUUID(),
      title: "Exercise for 30 minutes",
      completed: true,
    },
    {
      id: randomUUID(),
      title: "Write blog post",
      completed: false,
    },
    {
      id: randomUUID(),
      title: "Organize desk",
      completed: true,
    },
    {
      id: randomUUID(),
      title: "Schedule doctor appointment",
      completed: false,
    },
  ],
  /**@param {string} newTodo  */
  create(newTodo) {
    this._data = [
      ...this._data,
      {
        id: randomUUID(),
        title: newTodo,
        completed: false,
      },
    ];
    return this._data;
  },
  read() {
    return this._data;
  },
  /**@param {string} id */
  update(id) {
    const otherTodos = this._data.filter((todo) => todo.id !== id);
    const todo = this._data.filter((todo) => todo.id === id)[0];

    this._data = [
      ...otherTodos,
      {
        ...todo,
        completed: !todo.completed,
      },
    ];

    return this._data;
  },
  /**@param {string} id */
  delete(id) {
    this._data = this._data.filter((todo) => todo.id !== id);

    return this._data;
  },
};
