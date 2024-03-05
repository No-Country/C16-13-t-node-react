import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";

interface UserContextType {
  user: boolean;
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {

    const checkearUsuario = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return
      }
      try {
        const tokenvalid = {
          headers: {
            "token": `${token}`
          }
        };
        const { data } = await axios.get(`http://localhost:8080/user/perfil`, tokenvalid);
        setUser(data.user)

      } catch (error) {
        console.log(error)
      }
    }

    checkearUsuario();
  }, []);

console.log(user)


const cerrarSesion = ()=> {
  setUser({})
}

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        cerrarSesion
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
