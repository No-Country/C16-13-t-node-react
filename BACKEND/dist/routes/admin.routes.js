"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controllers_1 = require("../controllers/admin.controllers");
const adminRouter = (0, express_1.Router)();
adminRouter.put('/admin/roles', admin_controllers_1.changeRole);
adminRouter.put('/admin/availability', admin_controllers_1.banUnban);
adminRouter.put('/admin/modifieUser/:name', admin_controllers_1.editOtherInformation);
exports.default = adminRouter;
