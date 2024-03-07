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
exports.eliminarNoticia = exports.listarNoticias = exports.getNoticiaById = exports.editarNoticia = exports.agregarNoticia = void 0;
const notices_1 = __importDefault(require("../models/notices"));
const agregarNoticia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, subtitle, category, imgUrl, synopsis } = req.body;
        const noticia = new notices_1.default({ title, subtitle, category, imgUrl, synopsis });
        yield noticia.save();
        return res.status(201).json({
            msg: 'Noticia agregada correctamente!!',
            noticia
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error al agregar noticia. Intente nuevamente. Si el problema persiste contacte al administrador'
        });
    }
});
exports.agregarNoticia = agregarNoticia;
const editarNoticia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const noticia = yield notices_1.default.findById(id);
        if (!noticia) {
            return res.status(400).json({ msg: 'La noticia no fue encontrada' });
        }
        noticia.title = req.body.title || noticia.title;
        noticia.subtitle = req.body.subtitle || noticia.subtitle;
        noticia.synopsis = req.body.synopsis || noticia.synopsis;
        noticia.imgUrl = req.body.imgUrl || noticia.imgUrl;
        const noticiaActualizada = yield noticia.save();
        return res.status(202).json({ noticiaActualizada });
    }
    catch (error) {
        console.error(error);
        return res.status(504).json({ msg: 'Error al actualizar la noticia. Contacte al administrador' });
    }
});
exports.editarNoticia = editarNoticia;
const getNoticiaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const noticia = yield notices_1.default.findById(id);
        if (!noticia) {
            return res.status(404).json({ msg: 'Noticia no encontrada' });
        }
        return res.status(200).json({ noticia });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al obtener la noticia. Contacte al administrador' });
    }
});
exports.getNoticiaById = getNoticiaById;
const listarNoticias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noticias = yield notices_1.default.find();
        return res.status(200).json({
            msg: 'Lista de noticias',
            noticias
        });
    }
    catch (error) {
        return res.status(400).json({
            msg: 'Error al listar las noticias. Contacte al administrador'
        });
    }
});
exports.listarNoticias = listarNoticias;
const eliminarNoticia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const noticia = yield notices_1.default.findById(id);
        if (!noticia) {
            return res.status(400).json({ msg: 'Noticia no encontrada' });
        }
        yield noticia.deleteOne();
        return res.status(202).json({ msg: 'Noticia eliminada correctamente' });
    }
    catch (error) {
        console.error(error);
        return res.status(505).json({ msg: 'Ha ocurrido un error al eliminar la noticia. Contacte al administrador' });
    }
});
exports.eliminarNoticia = eliminarNoticia;
