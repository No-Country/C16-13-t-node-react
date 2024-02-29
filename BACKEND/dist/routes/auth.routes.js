"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_fields_1 = require("../middlewares/validate-fields");
const authRouter = (0, express_1.Router)();
authRouter.post('/login', [
    (0, express_validator_1.check)('email', 'The email is not valid').isEmail(),
    (0, express_validator_1.check)('pass', 'The password is required').not().isEmpty(),
    validate_fields_1.validateFields
], auth_controller_1.login);
exports.default = authRouter;
