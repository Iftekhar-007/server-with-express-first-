import express, { Request, Response } from "express";

import initDB from "./config/db";
import logger from "./middleware/logger";
import userRoutes from "./modules/user/user.routes";
import todoRouter from "./modules/todo/todo.routes";
import { authRoutes } from "./modules/auth/auth.routes";
const app = express();

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

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
    path: req.path,
  });
});

export default app;
