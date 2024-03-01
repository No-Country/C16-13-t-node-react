import { createContext, useState, ReactNode, useEffect } from "react";
import checkAuthService from "../service/checkAuth";
import axios from "axios";

interface UserContextType {
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>();

  useEffect(() => {

    const checkearUsuario = async () => {
      const token = localStorage.getItem('token');
      console.log(token);
      if(!token){
        return
      }
      
    }

    checkearUsuario();
  }, []);


  /*useEffect(()=>{

    const checkearUsuario = async ()=>{
      const token = localStorage.getItem('token');
      console.log(token)
      if (!token) return;

      try {
        const config = {
          headers: {
            "token": `${token}`
          }
        };
        const { data } = await axios.post(`http://localhost:8080/user/perfil`,config);
        setUser(data.user);

      } catch (error) {
        console.log(error)
        console.log(error.response.data.msg);
      }
    };
    checkearUsuario();
  },[user]);*/

  return (
    <UserContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
