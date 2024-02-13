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
const noticeSchema = new mongoose_1.Schema({
    titulo: {
        type: String,
        required: [true, "El titulo es obligatorio"]
    },
    subTitulo: {
        type: String,
        required: [true, "El subtitulo es obligatorio"]
    },
    foto: {
        type: Buffer,
        required: [true, "La foto es obligatoria"]
    },
    sinopsis: {
        type: String,
        required: [true, "La sinopsis es obligatoria"]
    },
    fecha: {
        type: Date,
        default: new Date()
    }
});
noticeSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, notice = __rest(_a, ["__v", "_id"]);
    notice.uid = _id;
    return notice;
};
exports.default = (0, mongoose_1.model)("Notices", noticeSchema);
