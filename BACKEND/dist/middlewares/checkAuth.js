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
exports.checkAuth = void 0;
const jwt = require('jsonwebtoken');
const user_1 = __importDefault(require("../models/user"));
require('dotenv').config();
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers) {
        try {
            token = req.headers.token;
            const decored = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
            req.user = yield user_1.default.findById(decored.uid).select('-password');
            return next();
        }
        catch (error) {
            const err = new Error('Token no valido.');
            return res.status(403).json({ msg: err.message });
        }
    }
    if (!token) {
        const error = new Error('Token invalido o inexistente.');
        res.status(403).json({ msg: error.message });
    }
    next();
});
exports.checkAuth = checkAuth;
