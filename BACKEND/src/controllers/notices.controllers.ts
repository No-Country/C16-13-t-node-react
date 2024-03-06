import { Request, Response } from 'express';
import Notice, { INotice } from '../models/notices';

export const agregarNoticia = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { title, subtitle, category, imgUrl, synopsis } = req.body;
        const noticia = new Notice({ title, subtitle, category, imgUrl, synopsis });
        await noticia.save();
        return res.status(201).json({
            msg: 'Noticia agregada correctamente!!',
            noticia
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error al agregar noticia. Intente nuevamente. Si el problema persiste contacte al administrador'
        });
    }
};

export const editarNoticia = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const noticia: INotice | null = await Notice.findById(id);

        if (!noticia) {
            return res.status(400).json({ msg: 'La noticia no fue encontrada' });
        }

        noticia.title = req.body.title || noticia.title;
        noticia.subtitle = req.body.subtitle || noticia.subtitle;
        noticia.synopsis = req.body.synopsis || noticia.synopsis;
        noticia.imgUrl = req.body.imgUrl || noticia.imgUrl;

        

        const noticiaActualizada: INotice | null = await noticia.save();
        return res.status(202).json({ noticiaActualizada });
    } catch (error) {
        console.error(error);
        return res.status(504).json({ msg: 'Error al actualizar la noticia. Contacte al administrador' });
    }
};

export const getNoticiaById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const noticia: INotice | null = await Notice.findById(id);
        if (!noticia) {
            return res.status(404).json({ msg: 'Noticia no encontrada' });
        }
        return res.status(200).json({ noticia });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al obtener la noticia. Contacte al administrador' });
    }
};

export const listarNoticias = async (req: Request, res: Response): Promise<Response> => {
    try {
        const noticias = await Notice.find();
        return res.status(200).json({
            msg: 'Lista de noticias',
            noticias
        });
    } catch (error) {
        return res.status(400).json({
            msg: 'Error al listar las noticias. Contacte al administrador'
        });
    }
};

export const eliminarNoticia = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const noticia: INotice | null = await Notice.findById(id);
        if (!noticia) {
            return res.status(400).json({ msg: 'Noticia no encontrada' });
        }
        await noticia.deleteOne();
        return res.status(202).json({ msg: 'Noticia eliminada correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(505).json({ msg: 'Ha ocurrido un error al eliminar la noticia. Contacte al administrador' });
    }
};
