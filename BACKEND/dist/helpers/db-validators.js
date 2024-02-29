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
exports.noticesExistById = exports.userExistById = exports.emailExists = void 0;
const notices_1 = __importDefault(require("../models/notices"));
const user_1 = __importDefault(require("../models/user"));
const emailExists = (email = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existsEmail = yield user_1.default.findOne({ email });
    if (existsEmail) {
        throw new Error(`User ${email} already exists`);
    }
});
exports.emailExists = emailExists;
const userExistById = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield user_1.default.findById(id);
    if (!existUser) {
        throw new Error(`User with id: ${id} does not exist`);
    }
});
exports.userExistById = userExistById;
const noticesExistById = (id = '') => __awaiter(void 0, void 0, void 0, function* () {
    const existNotice = yield notices_1.default.findById(id);
    if (!existNotice) {
        throw new Error(`Notice with id: ${id} does not exist`);
    }
});
exports.noticesExistById = noticesExistById;
