import { Router } from 'express';

import { 
  createUser, 
  deleteUserById, 
  getUserById, 
  getUsers, 
  obtenerPerfil, 
  updateUserById
} from '../controllers/users.controller';
import { check } from 'express-validator';
import { emailExists, userExistById } from '../helpers/db-validators'
import { validateFields } from '../middlewares/validate-fields';
import { validateJWT } from '../middlewares/validate-jwt';
<<<<<<< HEAD
import { login } from '../controllers/auth.controller';
=======
import { checkAuth } from '../middlewares/checkAuth';
>>>>>>> e56eca596fbc4e7deb095bfc05c52b2e83a2bdf8


const userRouter = Router();

userRouter.get('/user/perfil', checkAuth, obtenerPerfil)

userRouter.get('/user', getUsers);

userRouter.get('/user/:id', [
    check('id').custom( userExistById ),
], getUserById);

userRouter.post('/user', [
    check('name', 'Name is required').not().isEmpty(),
    check('pass', 'Password must be more than 8 letters.').isLength({ min: 8 }),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom( emailExists ),
    // isAdminRole
    validateFields
], createUser);

userRouter.put('/user/:id', [
    check('id', 'Is not valid id').isMongoId(),
    check('id').custom( userExistById ),
    validateFields
], updateUserById);

userRouter.delete('/user/:id', [
    validateJWT,
    // isAdminRole,
    check('id', 'Is not valid id').isMongoId(),
    check('id').custom( userExistById ),
    validateFields
], deleteUserById);

export default userRouter;