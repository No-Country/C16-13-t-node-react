import axios from 'axios';

const baseURL = 'http://localhost:8080';

const checkAuthService = {
    authenticateUser: async () => {
        const response = await axios.get(`${baseURL}/user/perfil`);
        return response.data;
    },
};

export default checkAuthService;