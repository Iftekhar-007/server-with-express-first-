import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoController } from "./todo.controller";

const router = express.Router();

router.post("/", todoController.createUser);

router.get("/", todoController.getTodo);

router.get("/:id", todoController.getSingleTodo);

router.put("/:id", todoController.updateTodo);

router.delete("/:id", todoController.deletetodo);

const todoRouter = router;

export default todoRouter;
