import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    res.json({
        msg: "User created",
    })
};

