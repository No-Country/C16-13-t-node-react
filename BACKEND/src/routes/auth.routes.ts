import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/auth.controller';
import { validateFields } from '../middlewares/validate-fields';

const authRouter = Router();

authRouter.post('/login', [
  check('email', 'The email is not valid').isEmail(),
  check('pass', 'The password is required').not().isEmpty(),
  validateFields
], login  );


export default authRouter;