"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notices_controllers_1 = require("../controllers/notices.controllers");
const noticesRouter = (0, express_1.Router)();
noticesRouter.get('/news', notices_controllers_1.listarNoticias);
noticesRouter.post('/news', notices_controllers_1.agregarNoticia);
exports.default = noticesRouter;
