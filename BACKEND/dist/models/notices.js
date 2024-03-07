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
exports.Category = void 0;
const mongoose_1 = require("mongoose");
// Define el enum para las categorías
var Category;
(function (Category) {
    Category["DEPORTES"] = "Deportes";
    Category["TECNOLOGIA"] = "Tecnolog\u00EDa";
    Category["POLICIALES"] = "Policiales";
    Category["ESPECTACULO"] = "Espectaculo";
    Category["POLITICAS"] = "Politicas";
    Category["INTERES_GENERAL"] = "Interes General";
})(Category || (exports.Category = Category = {}));
const noticeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "El título es obligatorio"]
    },
    subtitle: {
        type: String,
        required: [true, "El subtítulo es obligatorio"]
    },
    category: {
        type: String,
        enum: Object.values(Category), // Usamos los valores del enum como opciones válidas
        required: [true, "La categoría es obligatoria"]
    },
    imgUrl: {
        type: String,
        // required: [true, "La URL de la foto es obligatoria"]
    },
    synopsis: {
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
    notice.noticeId = _id;
    return notice;
};
exports.default = (0, mongoose_1.model)("Notices", noticeSchema);
