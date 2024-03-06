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
exports.validateToken = exports.login = void 0;
const bcryptjs = require('bcryptjs');
const user_1 = __importDefault(require("../models/user"));
const generate_jwt_1 = require("../helpers/generate-jwt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, pass } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password not valid - enail '
            });
        }
        if (!user.available) {
            return res.status(400).json({
                msg: 'User / Password not valid - available: false'
            });
        }
        const validPassword = bcryptjs.compareSync(pass, user.pass);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password not valid - password'
            });
        }
        const token = yield (0, generate_jwt_1.generateJWT)(user.id);
        res.json({
            user,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact administrator'
        });
    }
});
exports.login = login;
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers['authorization'];
    if (!token) {
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
    const validToken = yield (0, generate_jwt_1.verifyToken)(token);
    if (!validToken) {
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
    next();
});
exports.validateToken = validateToken;
