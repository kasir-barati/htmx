// @ts-check

import { randomUUID } from "crypto";

export const userRepo = {
  _data: [
    {
      id: randomUUID(),
      email: "fin@tech.cp",
      password: "Some hashed pass",
    },
  ],
  /**@param {{email: string, password: string}} user  */
  create(user) {
    const newUser = {
      id: randomUUID(),
      email: user.email,
      password: user.password,
    };

    this._data.push(newUser);

    return newUser;
  },
  read() {
    return this._data;
  },
  /**
   * @param {import("crypto").UUID} id
   * @param {{email: string; password: string}} user
   */
  update(id, user) {
    const otherUsers = this._data.filter((user) => user.id !== id);
    const updatedUser = {
      id,
      email: user.email,
      password: user.password,
    };

    this._data = [...otherUsers, updatedUser];

    return updatedUser;
  },
  /**@param {string} id */
  delete(id) {
    this._data = this._data.filter((user) => user.id !== id);

    return;
  },
};
