import axios from 'axios';

const baseURL = 'http://localhost:8080';

const authService = {
    authenticateUser: async (logearUsuario: any) => {
        const response = await axios.post(`${baseURL}/login`, logearUsuario);
        return response.data;
    },
};

export default authService;