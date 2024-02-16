import { Router } from 'express';
import { listarNoticias, agregarNoticia, editarNoticia, eliminarNoticia } from '../controllers/notices.controllers';

const noticesRouter = Router();

noticesRouter.get('/news', listarNoticias);
noticesRouter.post('/news', agregarNoticia);
noticesRouter.put('/news/:id', editarNoticia);
noticesRouter.delete('/news/:id', eliminarNoticia);




export default noticesRouter;