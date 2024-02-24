import { Router } from 'express';
import { check } from 'express-validator';

import { login, validateToken } from '../controllers/auth.controller';
import { validateFields } from '../middlewares/validate-fields';

const authRouter = Router();

authRouter.post('/login', [
  check('email', 'The email is not valid').isEmail(),
  check('password', 'The password is required').not().isEmpty(),
  validateFields
], login  );

authRouter.use('/secure', validateToken);

export default authRouter;