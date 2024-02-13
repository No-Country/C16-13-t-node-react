import { Request, Response } from "express";
import Notice from "../models/notices";

export const adminLogIn = async (req: Request, res: Response) => {
    res.json({
        msg: "Hello admin"
    })
};

