import { Request, Response } from "express";
import { todoServices } from "./todo.service";

const createUser = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await todoServices.createTodo(req.body);

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
};

const getTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodos();

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
};

const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getSingleTodo(req.params.id as string);

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
};

const updateTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await todoServices.updateTodo(
      user_id,
      title,
      req.params.id as string
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
};

const deletetodo = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.deletetodo(req.params.id as string);

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
};

export const todoController = {
  createUser,
  getTodo,
  getSingleTodo,
  updateTodo,
  deletetodo,
};
