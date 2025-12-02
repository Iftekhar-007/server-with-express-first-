import { Request, Response } from "express";
import { pool } from "../../config/db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  const { name, age, email } = req.body;

  try {
    const result = await userServices.createUser(name, age, email);

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

export const userControllers = {
  createUser,
};
