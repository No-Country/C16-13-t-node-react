import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const category: string[] = ["Deportes", "Tecnología", 'Policiales', 'Espectaculo', 'Politicas', 'Interes General'];


export const Menu = () => {

  const { user, cerrarSesion } = useContext(UserContext);
  const { rol } = user;


  return (
    <div className="text-[--primary] list-none flex flex-col justify-between pt-10 animacion-menu" >
      <div className="font-bold flex flex-col justify-center items-center gap-4 pb-14">
        {
          category.map(categ => (
            <div key={categ}>
              <li className="hover:text-[--warning-100] hover:cursor-pointer">
                <Link to={`/notice/category/${categ}`}>{categ}</Link>
              </li>
            </div>
          ))
        }
      </div>
      {
        rol 
        ? <li className="font-extrabold text-center hover:text-[--warning-100] hover:cursor-pointer" onClick={cerrarSesion}><Link to="/login">Cerrar sesion</Link></li> 
        : <li className="font-extrabold text-center hover:text-[--warning-100] hover:cursor-pointer"><Link to="/login">Iniciar sesion</Link></li>
      }
      
    </div>

  )
}
