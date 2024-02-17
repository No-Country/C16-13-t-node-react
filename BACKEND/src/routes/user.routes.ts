import { Router } from 'express';
import { createUser } from '../controllers/users.controller';

const userRouter = Router();

userRouter.get('/user', createUser);
userRouter.post('/user', createUser);
userRouter.put('/user', createUser);
userRouter.delete('/user', createUser);

export default userRouter;