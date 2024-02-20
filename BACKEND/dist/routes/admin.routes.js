"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controllers_1 = require("../controllers/admin.controllers");
const adminRouter = (0, express_1.Router)();
adminRouter.get('/admin', admin_controllers_1.adminLogIn);
exports.default = adminRouter;
