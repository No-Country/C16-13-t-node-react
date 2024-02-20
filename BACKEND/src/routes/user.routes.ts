import { Router } from 'express';

import { 
  createUser, 
  deleteUserById, 
  getUserById, 
  getUsers, 
  updateUserById
} from '../controllers/users.controller';
import { check } from 'express-validator';
import { emailExists } from '../helpers/db-validators'


const userRouter = Router();

userRouter.get('/user', getUsers);
userRouter.get('/user/:id', getUserById);
userRouter.post('/user', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Password is required').isLength({ min: 6}),
  check('email', 'The email is not valid').isEmail(),
  check('email').custom( emailExists ),
], createUser);
userRouter.put('/user/:id', updateUserById);
userRouter.delete('/user/:id', deleteUserById);

export default userRouter;