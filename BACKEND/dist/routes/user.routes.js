"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const userRouter = (0, express_1.Router)();
userRouter.get('/user', users_controller_1.getUsers);
userRouter.get('/user/:id', users_controller_1.getUserById);
userRouter.post('/user', [
    (0, express_validator_1.check)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.check)('password', 'Password is required').isLength({ min: 6 }),
    (0, express_validator_1.check)('email', 'The email is not valid').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailExists),
], users_controller_1.createUser);
userRouter.put('/user/:id', users_controller_1.updateUserById);
userRouter.delete('/user/:id', users_controller_1.deleteUserById);
exports.default = userRouter;
