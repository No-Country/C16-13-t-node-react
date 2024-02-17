import axios from 'axios';
import { Notice } from '../interface/NoticeModel';

const baseURL = 'http://localhost:8080';

const noticesService = {
    agregarNoticia: async (nuevaNoticia: Notice) => {
        const response = await axios.post(`${baseURL}/news`, nuevaNoticia);
        return response.data.noticias;
    },

    editarNoticia: async (id: string, noticiaEditada: Partial<Notice>) => {
        const response = await axios.put(`${baseURL}/news/${id}`, noticiaEditada);
        return response.data.noticias;
    },

    getNoticiaById: async (id: string) => {
        const response = await axios.get(`${baseURL}/news/${id}`);
        return response.data.noticia;
    },

    listarNoticias: async () => {
        const response = await axios.get(`${baseURL}/news`);
        return response.data.noticias;
    },

    eliminarNoticia: async (id: string) => {
        const response = await axios.delete(`${baseURL}/news/${id}`);
        return response.data.noticias;
    }
};

export default noticesService;
