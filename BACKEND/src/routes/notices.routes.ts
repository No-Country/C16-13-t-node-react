import { Router } from 'express';
import { listarNoticias, agregarNoticia } from '../controllers/notices.controllers';

const noticesRouter = Router();

noticesRouter.get('/news', listarNoticias);
noticesRouter.post('/news', agregarNoticia);




export default noticesRouter;