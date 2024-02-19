"use strict";
exports.__esModule = true;
var express_1 = require("express");
var users_controller_1 = require("../controllers/users.controller");
var userRouter = express_1.Router();
userRouter.get('/user', users_controller_1.getUsers);
userRouter.get('/user/:id', users_controller_1.getUserById);
userRouter.post('/user', users_controller_1.createUser);
userRouter.put('/user/:id', users_controller_1.updateUserById);
userRouter["delete"]('/user/:id', users_controller_1.deleteUserById);
exports["default"] = userRouter;
