"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = exports.comparePassword = void 0;
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require('jsonwebtoken');
const user_1 = __importDefault(require("../models/user"));
const comparePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield bcrypt_1.default.compare(password, hashedPassword)) {
            console.log(yield bcrypt_1.default.compare(password, hashedPassword));
            return true;
        }
        return false;
    }
    catch (error) {
        return error;
    }
});
exports.comparePassword = comparePassword;
const validateJWT = (req = express_1.request, res = express_1.response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        let user = yield user_1.default.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: 'Token not valid - user does not exist in DB'
            });
        }
        if (!user.available) {
            return res.status(401).json({
                msg: 'Token not valid - user is not available'
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
});
exports.validateJWT = validateJWT;
