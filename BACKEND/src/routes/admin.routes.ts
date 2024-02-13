import { Router } from 'express';
import { adminLogIn } from '../controllers/admin.controllers';

const noticesRouter = Router();

noticesRouter.get('/admin', adminLogIn);



export default noticesRouter;