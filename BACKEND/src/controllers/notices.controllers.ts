import { Request, Response } from "express";
import Notice from "../models/notices";

export const listarNoticias = async (req: Request, res: Response) => {

    try {
        const noticias = await Notice.find();

        res.status(200).json({
            msg: "Lista de noticias",
            noticias
        });

    } catch (error) {
        res.status(400).json({
            msg: "Error al listar las noticias. Contacte al administrador"
        })
    }

};

export const agregarNoticia = async (req: Request, res: Response) => {

    try {
        const { title, subtitle, category, imgUrl, synopsis } = req.body
        const noticia = new Notice({ title, subtitle, category, imgUrl, synopsis });
        await noticia.save();

        res.status(201).json({
            msg: "Noticia agregada correctamente!!",
            noticia
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error al agregar noticia. Intente nuevamente. Si el problema persiste contacte al administrador"
        })
    }

};
