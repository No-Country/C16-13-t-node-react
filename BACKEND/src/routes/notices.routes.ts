import { Router } from 'express';
import { listarNoticias } from '../controllers/notices.controllers';

const noticesRouter = Router();

noticesRouter.get('/news', listarNoticias);



export default noticesRouter;