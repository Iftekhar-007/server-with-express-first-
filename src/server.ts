import express, { NextFunction, Request, Response } from "express";

import { Pool, Result } from "pg";
import path from "path";
import { title } from "process";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import userRoutes from "./modules/user/user.routes";
import todoRouter from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";
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

// ! users crud full

app.use("/users", userRoutes);

//! todos crud

app.use("/todos", todoRouter);

// ! auth crud

app.use("/auth", authRoutes);

// ! listen port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
