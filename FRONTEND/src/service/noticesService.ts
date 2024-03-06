import axios from 'axios';
import { Notice } from '../interface/NoticeModel';
// import AuthProvider from '../context/UserProvider';

const baseURL = 'http://localhost:8080';

const noticesService = {
    agregarNoticia: async (nuevaNoticia: Notice) => {
        const response = await axios.post(`${baseURL}/news`,  {
            data: nuevaNoticia 
        }, {
          headers: {
            'Content-Type': 'appllication/json',
            'x-token': localStorage.getItem('token'),
          },
        })
            .then( () => {
              console.log('add notice');
            } )
            .catch( (err) => {
              console.log(err)
              throw new Error(err.message)
            } );
        return response;
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
        const response = await axios.delete(`${baseURL}/news/${id}`, {
          headers: {
            'Content-Type': 'appllication/json',
            'x-token': localStorage.getItem('token'),
          },
        });
        return response.data.noticias;
    }
};

export default noticesService;
