import { Request, Response } from "express";
import { userServices } from "./user.service";
import { pool } from "../../config/db";

const createUser = async (req: Request, res: Response) => {
  const { name, age, email, password } = req.body;

  try {
    const result = await userServices.createUser(req.body);

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
};

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();

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
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleUser(req.params.id as string);

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

const updateUser = async (req: Request, res: Response) => {
  const { name, age, email } = req.body;
  try {
    const result = await userServices.updateUser(
      name,
      age,
      email,
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

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteSingleUser(req.params.id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: " no user found with this id",
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

export const userControllers = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteSingleUser,
};
