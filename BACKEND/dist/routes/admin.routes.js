"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controllers_1 = require("../controllers/admin.controllers");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const adminRouter = (0, express_1.Router)();
adminRouter.put('/admin/roles', [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
], admin_controllers_1.changeRole);
adminRouter.put('/admin/availability', [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
], admin_controllers_1.banUnban);
adminRouter.put('/admin/modifieUser/:name', [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
], admin_controllers_1.editOtherInformation);
adminRouter.put('/admin/modifieCategoryOfNew/:id', [
    validate_jwt_1.validateJWT,
    validate_fields_1.validateFields
], admin_controllers_1.modifieCategoryOfNew);
exports.default = adminRouter;
