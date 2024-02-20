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
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const users_1 = __importDefault(require("../models/users"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.default.find();
        return res.status(200).json({
            msg: 'Users list',
            users
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error listing users. Contact administrator'
        });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield users_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ msg: 'Noticia no encontrada' });
        }
        return res.status(200).json({ user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error getting user. Contact administrator'
        });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, lastName, pass, email, imgUrl } = req.body;
        const user = new users_1.default({ name, lastName, pass, email, imgUrl });
        yield user.save();
        return res.status(201).json({
            msg: 'User created successfully',
            user
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error '
        });
    }
});
exports.createUser = createUser;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield users_1.default.findById(id);
        if (!user) {
            return res.status(400).json({ msg: 'The user was not found' });
        }
        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.pass = req.body.pass || user.pass;
        user.email = req.body.email || user.email;
        user.imgUrl = req.body.imgUrl || user.imgUrl;
        // user.avilable = true;
        const userUpdated = yield user.save();
        return res.status(200).json({ userUpdated });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error updating user. Contact administrator'
        });
    }
});
exports.updateUserById = updateUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield users_1.default.findById(id);
        if (!user) {
            return res.status(400).json({ msg: 'The user was not found' });
        }
        user.avilable = false;
        const userEliminated = yield user.save();
        return res.status(200).json({
            msg: 'User deleted successfully',
            userEliminated
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Error deleting a user. Contact administrator'
        });
    }
});
exports.deleteUserById = deleteUserById;
