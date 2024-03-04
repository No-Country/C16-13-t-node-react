"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const mongoose_1 = require("mongoose");
// Define el enum para los roles de usuarios
var Roles;
(function (Roles) {
    Roles["SUPADMIN"] = "superadmin";
    Roles["ADMIN"] = "administrator";
    Roles["USER"] = "user";
})(Roles || (exports.Roles = Roles = {}));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    lastName: {
        type: String,
        required: [true, "LastName is required"]
    },
    pass: {
        type: String,
        required: [true, "Pass is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    imgUrl: {
        type: String,
        // required: [true, "ImageUrl is required"]
        // Change at deploying time to validate the image
        default: 'localhost:8000/assets/userDefault.jpg'
    },
    rol: {
        type: String,
        enum: Object.values(Roles),
        // required: [true, "Role is required"]
        default: Roles.USER
    },
    available: {
        type: Boolean,
        default: true
    }
});
userSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, user = __rest(_a, ["__v", "_id"]);
    user.userId = _id;
    return user;
};
exports.default = (0, mongoose_1.model)("User", userSchema);
