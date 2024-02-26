import axios from 'axios';

const baseURL = 'http://localhost:8080';

const authService = {
    agregarNoticia: async (logearUsuario: any) => {
        const response = await axios.post(`${baseURL}/login`, logearUsuario);
        return response.data.noticias;
    },
};

export default authService;