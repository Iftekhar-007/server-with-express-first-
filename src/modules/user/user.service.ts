import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, age, email, password } = payload;
  const hash = await bcrypt.hash(password as string, 10);
  const result = await pool.query(
    `INSERT INTO users(name,age,email,password) VALUES($1,$2,$3,$4) RETURNING *`,
    [name, age, email, hash]
  );

  return result;
};

const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateUser = async (
  name: string,
  age: number,
  email: string,
  id: string
) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, age=$2,email=$3 WHERE id=$4 RETURNING *`,
    [name, age, email, id]
  );

  return result;
};

const deleteSingleUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userServices = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteSingleUser,
};
