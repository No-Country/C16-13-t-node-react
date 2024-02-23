import { Router } from 'express';

import { 
  createUser, 
  deleteUserById, 
  getUserById, 
  getUsers, 
  updateUserById
} from '../controllers/users.controller';
import { check } from 'express-validator';
import { emailExists, userExistById } from '../helpers/db-validators'
import { validateFields } from '../middlewares/validate-fields';


const userRouter = Router();

userRouter.get('/user', getUsers);

userRouter.get('/user/:id', [
  check('id').custom( userExistById ),
], getUserById);

userRouter.post('/user', [
  check('name', 'Name is required').not().isEmpty(),
  check('pass', 'Password is required').isLength({ min: 8 }),
  check('email', 'The email is not valid').isEmail(),
  check('email').custom( emailExists ),
  check('rol', 'It is not a valid role').isIn(['superadmin', 'administrator', 'user']),
  // isAdminRole
  validateFields
], createUser);

userRouter.put('/user/:id', [
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom( userExistById ),
  validateFields
], updateUserById);

userRouter.delete('/user/:id', [
  // validateJWT,
  // isAdminRole,
  check('id', 'Is not valid id').isMongoId(),
  check('id').custom( userExistById ),
  validateFields
], deleteUserById);

export default userRouter;