import express, { NextFunction, Request, Response } from "express";

import { Pool, Result } from "pg";
import path from "path";
import { title } from "process";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import userRoutes from "./modules/user/user.routes";
const app = express();
const port = config.port;

// ! parser
app.use(express.json());
app.use(express.urlencoded());

initDB();

// ! root api
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello from shawon!");
});

// ! users crud

app.use("/users", userRoutes);

// todos crud

//! post todos api
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,
      [user_id, title]
    );

    res.status(201).json({
      message: "successfully added todos",
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

//! todos get api

app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);

    res.status(201).json({
      success: true,
      message: `all todos here`,
      data: result.rows,
    });
  } catch (err: any) {
    res.status(504).json({
      message: err.message,
      success: false,
    });
  }
});

//! get single todos
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos WHERE id=$1`, [
      req.params.id,
    ]);

    res.status(201).json({
      success: true,
      message: `all todos here`,
      data: result.rows,
    });
  } catch (err: any) {
    res.status(504).json({
      message: err.message,
      success: false,
    });
  }
});

// ! todos update api

app.put("/todos/:id", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await pool.query(
      `UPDATE todos SET user_id=$1,title=$2 WHERE id=$3 RETURNING *`,
      [user_id, title, req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: " no user found with this id",
      });
    } else {
      res.send(result.rows[0]);
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ! delete post todos

app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`DELETE FROM todos WHERE id = $1`, [
      req.params.id,
    ]);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: " no todos found with this id",
      });
    } else {
      res.status(201).json({
        success: true,
        message: " deleted successfully",
        data: result.rows[0],
        countNumber: result.rowCount,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// ! listen port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
