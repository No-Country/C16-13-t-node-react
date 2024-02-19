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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getUsers = void 0;
var users_1 = require("../models/users");
exports.getUsers = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, users_1["default"].find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        msg: 'Users list',
                        users: users
                    })];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({
                        msg: 'Error listing users. Contact administrator'
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var id, user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, users_1["default"].findById(id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ msg: 'Noticia no encontrada' })];
                }
                return [2 /*return*/, res.status(200).json({ user: user })];
            case 3:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, res.status(500).json({
                        msg: 'Error getting user. Contact administrator'
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createUser = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var _a, name, lastName, pass, email, imgUrl, user, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name = _a.name, lastName = _a.lastName, pass = _a.pass, email = _a.email, imgUrl = _a.imgUrl;
                user = new users_1["default"]({ name: name, lastName: lastName, pass: pass, email: email, imgUrl: imgUrl });
                return [4 /*yield*/, user.save()];
            case 1:
                _b.sent();
                return [2 /*return*/, res.status(201).json({
                        msg: 'User created successfully',
                        user: user
                    })];
            case 2:
                err_3 = _b.sent();
                console.log(err_3);
                return [2 /*return*/, res.status(500).json({
                        msg: 'Error '
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateUserById = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var id, user, userUpdated, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, users_1["default"].findById(id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ msg: 'The user was not found' })];
                }
                user.name = req.body.name || user.name;
                user.lastName = req.body.lastName || user.lastName;
                user.pass = req.body.pass || user.pass;
                user.email = req.body.email || user.email;
                user.imgUrl = req.body.imgUrl || user.imgUrl;
                return [4 /*yield*/, user.save()];
            case 3:
                userUpdated = _a.sent();
                return [2 /*return*/, res.status(200).json({ userUpdated: userUpdated })];
            case 4:
                err_4 = _a.sent();
                console.log(err_4);
                return [2 /*return*/, res.status(500).json({
                        msg: 'Error updating user. Contact administrator'
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteUserById = function (req, res) { return __awaiter(void 0, void 0, Promise, function () {
    var id, user, userEliminated, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, users_1["default"].findById(id)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ msg: 'The user was not found' })];
                }
                user.avilable = false;
                return [4 /*yield*/, user.save()];
            case 3:
                userEliminated = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        msg: 'User deleted successfully',
                        userEliminated: userEliminated
                    })];
            case 4:
                err_5 = _a.sent();
                console.log(err_5);
                return [2 /*return*/, res.status(500).json({
                        msg: 'Error deleting a user. Contact administrator'
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
