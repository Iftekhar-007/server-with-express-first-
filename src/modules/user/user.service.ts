import { pool } from "../../config/db";

const createUser = async (name: string, age: number, email: string) => {
  const result = await pool.query(
    `INSERT INTO users(name,age,email) VALUES($1,$2,$3) RETURNING *`,
    [name, age, email]
  );

  return result;
};

export const userServices = {
  createUser,
};
