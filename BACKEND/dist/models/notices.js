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
// Define el enum para las categorías
var Categoria;
(function (Categoria) {
    Categoria["DEPORTES"] = "Deportes";
    Categoria["TECNOLOGIA"] = "Tecnolog\u00EDa";
    Categoria["POLICIALES"] = "Policiales";
    Categoria["ESPECTACULO"] = "Espectaculo";
    Categoria["POLITICAS"] = "Politicas";
})(Categoria || (Categoria = {}));
const noticeSchema = new mongoose_1.Schema({
    titulo: {
        type: String,
        required: [true, "El título es obligatorio"]
    },
    subTitulo: {
        type: String,
        required: [true, "El subtítulo es obligatorio"]
    },
    categoria: {
        type: String,
        enum: Object.values(Categoria), // Usamos los valores del enum como opciones válidas
        required: [true, "La categoría es obligatoria"]
    },
    foto: {
        type: String,
        required: [true, "La URL de la foto es obligatoria"]
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
    notice.noticeId = _id;
    return notice;
};
exports.default = (0, mongoose_1.model)("Notices", noticeSchema);
