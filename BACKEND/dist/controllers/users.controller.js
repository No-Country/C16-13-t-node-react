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
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getUsers = exports.obtenerPerfil = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs = require('bcryptjs');
const obtenerPerfil = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    res.json({
        user
    });
});
exports.obtenerPerfil = obtenerPerfil;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find();
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
        const user = yield user_1.default.findById(id);
        // if( !user ) {
        //     return res.status(404).json({ msg: 'Noticia no encontrada' });
        // }
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
        const emailExists = yield user_1.default.findOne({ email: req.body.email });
        if (!emailExists) {
            const { name, lastName, pass, email, imgUrl } = req.body;
            if (req.body.pass === req.body.confirmPass) {
                const saltRounds = 10; // Factor de costo para bcrypt
                const salt = bcryptjs.genSaltSync(saltRounds); // Genera un salt con el factor de costo especificado
                const user = new user_1.default({ name, lastName, pass, email, imgUrl });
                user.pass = bcryptjs.hashSync(pass, salt); // Hashea la contraseña con el salt generado
                yield user.save();
                return res.status(201).json({
                    msg: 'User created successfully',
                    user
                });
            }
            else {
                return res.send('Passwords do not match.');
            }
        }
        else {
            return res.send(`${req.body.email} is already in use.`);
        }
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
        const user = yield user_1.default.findById(id);
        if (!user) {
            return res.status(400).json({ msg: 'The user was not found' });
        }
        user.name = req.body.name || user.name;
        user.lastName = req.body.lastName || user.lastName;
        user.pass = req.body.pass || user.pass;
        user.email = req.body.email || user.email;
        user.imgUrl = req.body.imgUrl || user.imgUrl;
        user.rol = req.body.rol || user.rol;
        const password = req.body.pass || user.pass;
        if (password) {
            const salt = bcryptjs.genSaltSync();
            user.pass = bcryptjs.hashSync(password, salt);
        }
        const userUpdated = yield user_1.default.findByIdAndUpdate(id, user);
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
        const user = yield user_1.default.findById(id);
        if (!user) {
            return res.status(400).json({ msg: 'The user was not found' });
        }
        const userEliminated = yield user_1.default.findByIdAndUpdate(id, { available: false });
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
