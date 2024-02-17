import { Router } from 'express';
import { listarNoticias, agregarNoticia, editarNoticia, eliminarNoticia, getNoticiaById } from '../controllers/notices.controllers';

const noticesRouter = Router();

noticesRouter.post('/news', agregarNoticia);
noticesRouter.put('/news/:id', editarNoticia);
noticesRouter.get('/news/:id', getNoticiaById);
noticesRouter.get('/news', listarNoticias);
noticesRouter.delete('/news/:id', eliminarNoticia);

export default noticesRouter;