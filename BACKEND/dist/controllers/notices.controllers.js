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
exports.agregarNoticia = exports.listarNoticias = void 0;
const notices_1 = __importDefault(require("../models/notices"));
const listarNoticias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noticias = yield notices_1.default.find();
        res.status(200).json({
            msg: "Lista de noticias",
            noticias
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "Error al listar las noticias. Contacte al administrador"
        });
    }
});
exports.listarNoticias = listarNoticias;
const agregarNoticia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, subtitle, category, imgUrl, synopsis } = req.body;
        const noticia = new notices_1.default({ title, subtitle, category, imgUrl, synopsis });
        yield noticia.save();
        res.status(201).json({
            msg: "Noticia agregada correctamente!!",
            noticia
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al agregar noticia. Intente nuevamente. Si el problema persiste contacte al administrador"
        });
    }
});
exports.agregarNoticia = agregarNoticia;
