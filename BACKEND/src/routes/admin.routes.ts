import { Router } from 'express';
import { adminLogIn } from '../controllers/admin.controllers';

const adminRouter = Router();

adminRouter.get('/admin', adminLogIn);



export default adminRouter;