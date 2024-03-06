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
exports.modifieCategoryOfNew = exports.editOtherInformation = exports.banUnban = exports.changeRole = exports.supAdminLogin = exports.adminLogIn = void 0;
const user_1 = __importDefault(require("../models/user"));
const notices_1 = __importDefault(require("../models/notices"));
const user_2 = require("../models/user");
const notices_2 = require("../models/notices");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const adminLogIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminEmail = yield user_1.default.findOne({ email: req.body.email });
        if (adminEmail) {
            const isPasswordMatch = yield (0, validate_jwt_1.comparePassword)(req.body.pass, adminEmail.pass);
            if (isPasswordMatch && user_2.Roles.ADMIN === adminEmail.rol) {
                return true;
            }
            return false;
        }
        console.log(`Email ${req.body.email} not found.`);
        res.send(`Email ${req.body.email} not found.`);
    }
    catch (error) {
        res.send(error);
    }
});
exports.adminLogIn = adminLogIn;
const supAdminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminEmail = yield user_1.default.findOne({ email: req.body.email });
        if (adminEmail) {
            const isPasswordMatch = yield (0, validate_jwt_1.comparePassword)(req.body.pass, adminEmail.pass);
            if (isPasswordMatch && user_2.Roles.SUPADMIN === adminEmail.rol) {
                // res.send(`You logged in as ${adminEmail.name}.`)
                return true;
            }
            // res.send('Can´t access here.')
            return false;
        }
        else {
            console.log(`Email ${req.body.email} not found.`);
            return false;
        }
        // res.send(`Email ${req.body.email} not found.`) 
    }
    catch (error) {
        res.send(error);
    }
});
exports.supAdminLogin = supAdminLogin;
// export const changeRole = async(req: Request, res: Response) => {
//     try {
//         const role = req.body.rol
//         if(await supAdminLogin(req, res)){
//             const user = await usersModel.findOne({name: req.body.name})
//             if(user && (role === Roles.SUPADMIN || role === Roles.ADMIN ||role === Roles.USER)){
//                 await usersModel.updateOne({_id: user._id}, { rol: role } )
//                 await user.save()
//                 res.send(`You´ve change the role of ${user.name}. Now he/she is ${role} `)
//             }else if(role !== Roles.SUPADMIN || role !== Roles.ADMIN ||role !== Roles.USER){
//                 res.send(`Error. Invalid role: ${role}`)
//             }
//             else{
//                 res.send('Something went wrong')
//             }
//         }else{
//             res.send(await supAdminLogin(req, res))
//         }
//     } catch (error) {
//         res.send(error)
//     }
// }
const changeRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = req.body.rol;
        const user = yield user_1.default.findOne({ name: req.body.name });
        if (yield (0, exports.supAdminLogin)(req, res)) {
            if (user && (role === user_2.Roles.SUPADMIN || role === user_2.Roles.ADMIN || role === user_2.Roles.USER)) {
                yield user_1.default.updateOne({ _id: user._id }, { rol: role });
                yield user.save();
                res.send(`You´ve change the role of ${user.name}. Now he/she is ${role} `);
            }
            else if (role !== user_2.Roles.SUPADMIN || role !== user_2.Roles.ADMIN || role !== user_2.Roles.USER) {
                res.send(`Error. Invalid role: ${role}`);
            }
            else {
                res.send('Something went wrong');
            }
        }
        else {
            res.send(`You don´t have enough permissions.`);
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.changeRole = changeRole;
const banUnban = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((yield (0, exports.supAdminLogin)(req, res)) || (yield (0, exports.adminLogIn)(req, res))) {
            const admin = yield user_1.default.findOne({ email: req.body.email });
            const user = yield user_1.default.findOne({ name: req.body.name });
            const action = req.body.available;
            if (admin && user) {
                if (user.rol < admin.rol) {
                    yield user_1.default.updateOne({ _id: user._id }, { available: action });
                    user.save();
                    if (action === true) {
                        res.send(`User ${user.name} got unbanned.`);
                    }
                    else {
                        res.send(`User ${user.name} got banned.`);
                    }
                }
                else {
                    res.send(`You can´t ban or unban a higher rank user.`);
                }
            }
            if (!user) {
                res.send(`User ${req.body.name} not found.`);
            }
        }
        else {
            res.send(`You can´t access here`);
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.banUnban = banUnban;
const editOtherInformation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((yield (0, exports.supAdminLogin)(req, res)) || (yield (0, exports.adminLogIn)(req, res))) {
            const userToModifie = yield user_1.default.findOne({ name: req.params.name });
            const admin = yield user_1.default.findOne({ email: req.body.email });
            if (userToModifie && admin && userToModifie.rol <= admin.rol) {
                console.log("hola");
                const { name, lastName, age, password } = req.body;
                const updateFields = {
                    name,
                    lastName,
                    age,
                    password
                };
                yield user_1.default.updateOne({ _id: userToModifie._id }, updateFields);
                userToModifie.save();
                res.send('Modificado');
            }
            else {
                res.send('Something went wrong');
            }
        }
        else {
            res.send(`You can´t access here.`);
        }
    }
    catch (error) {
    }
});
exports.editOtherInformation = editOtherInformation;
const modifieCategoryOfNew = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((yield (0, exports.supAdminLogin)(req, res)) || (yield (0, exports.adminLogIn)(req, res))) {
            const newId = yield notices_1.default.findOne({ _id: req.params.id });
            const newCategory = req.body.newCategory;
            if (newId) {
                const isCategoryValid = (value) => {
                    return Object.values(notices_2.Category).includes(value);
                };
                if (isCategoryValid(newCategory)) {
                    yield newId.updateOne({ category: newCategory });
                    yield newId.save();
                    res.send(`Category of the new ${newId.title} has been changed. New category ${newCategory}`);
                }
                else {
                    res.send(`Category ${newCategory} doens´t exist.`);
                }
            }
        }
        else {
            res.send(`You can´t access here.`);
        }
    }
    catch (error) {
        res.send(error);
    }
});
exports.modifieCategoryOfNew = modifieCategoryOfNew;
