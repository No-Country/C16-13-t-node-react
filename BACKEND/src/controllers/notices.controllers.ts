import { Request, Response } from "express";
import Notice from "../models/notices";

export const listarNoticias = async (req: Request, res: Response) => {
    res.json({
        msg: "LISTANDO NOTICIAS"
    })
};

