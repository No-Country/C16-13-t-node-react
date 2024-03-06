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
const mongoose_1 = require("mongoose");
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
        required: [true, "Email is required"]
    },
    imgUrl: {
        type: String,
        required: [true, "ImageUrl is required"]
    },
    avilable: {
        type: Boolean,
        default: true
    }
});
userSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, user = __rest(_a, ["__v", "_id"]);
    user.userId = _id;
    return user;
};
exports.default = (0, mongoose_1.model)("Users", userSchema);
