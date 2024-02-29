import axios from 'axios';

const baseURL = 'http://localhost:8080/login';

const authService = {
    authenticateUser: async (logearUsuario: any) => {
        const response = await axios.post(`${baseURL}`, logearUsuario);
        return response.data.noticias;
    },
};

export default authService;