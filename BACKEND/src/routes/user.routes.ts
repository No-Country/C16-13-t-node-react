import { Router } from 'express';

import {  createUser, 
          deleteUserById, 
          getUserById, 
          getUsers, 
          updateUserById
} from '../controllers/users.controller';


const userRouter = Router();

userRouter.get('/user', getUsers);
userRouter.get('/user/:id', getUserById);
userRouter.post('/user', createUser);
userRouter.put('/user/:id', updateUserById);
userRouter.delete('/user/:id', deleteUserById);


export default userRouter;