import { pool } from "../../config/db";

const createTodo = async (payload: Record<string, any>) => {
  const result = await pool.query(
    `INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,
    [payload.user_id, payload.title]
  );

  return result;
};

const getTodos = async () => {
  const result = await pool.query(`SELECT * FROM todos`);
  return result;
};

const getSingleTodo = async (id: string) => {
  const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [id]);

  return result;
};

const updateTodo = async (user_id: number, title: string, id: string) => {
  const result = await pool.query(
    `UPDATE todos SET user_id=$1,title=$2 WHERE id=$3 RETURNING *`,
    [user_id, title, id]
  );

  return result;
};

const deletetodo = async (id: string) => {
  const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [id]);

  return result;
};

export const todoServices = {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deletetodo,
};
