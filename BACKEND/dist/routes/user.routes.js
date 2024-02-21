"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const express_validator_1 = require("express-validator");
const db_validators_1 = require("../helpers/db-validators");
const validate_fields_1 = require("../middlewares/validate-fields");
const userRouter = (0, express_1.Router)();
userRouter.get('/user', users_controller_1.getUsers);
userRouter.get('/user/:id', users_controller_1.getUserById);
userRouter.post('/user', [
    (0, express_validator_1.check)('name', 'Name is required').not().isEmpty(),
    (0, express_validator_1.check)('pass', 'Password is required').isLength({ min: 8 }),
    (0, express_validator_1.check)('email', 'The email is not valid').isEmail(),
    (0, express_validator_1.check)('email').custom(db_validators_1.emailExists),
    (0, express_validator_1.check)('rol', 'It is not a valid role').isIn(['superadmin', 'administrator', 'user']),
    // isAdminRole
    validate_fields_1.validateFields
], users_controller_1.createUser);
userRouter.put('/user/:id', [
    (0, express_validator_1.check)('id', 'Is not valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.userExistById),
    validate_fields_1.validateFields
], users_controller_1.updateUserById);
userRouter.delete('/user/:id', [
    // validateJWT,
    // isAdminRole,
    (0, express_validator_1.check)('id', 'Is not valid id').isMongoId(),
    (0, express_validator_1.check)('id').custom(db_validators_1.userExistById),
    validate_fields_1.validateFields
], users_controller_1.deleteUserById);
exports.default = userRouter;
