import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    res.json({
        msg: "User created",
    })
};



export const getUsers = async (req: Request, res: Response) => {
  res.json({
      msg: "getUsers",
  })
};

export const getUserById = async (req: Request, res: Response) => {
  res.json({
      msg: "getUserById",
  })
};

export const deleteUserById = async (req: Request, res: Response) => {
  res.json({
      msg: "deleteUserById",
  })
};

export const updateUserById = async (req: Request, res: Response) => {
  res.json({
      msg: "updateUserById",
  })
};
