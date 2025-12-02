import express, { Request, Response } from "express";
import { pool } from "../../config/db";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, age, email } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name,age,email) VALUES($1,$2,$3) RETURNING *`,
      [name, age, email]
    );

    res.status(201).json({
      message: "successfully added user",
      success: true,
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(504).json({
      message: err.message,
      success: false,
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      detaile: err,
    });
  }
});

const userRoutes = router;

export default userRoutes;
