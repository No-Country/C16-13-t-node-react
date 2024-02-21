import { Link } from "react-router-dom";

const category: string[] = ["Deportes", "Tecnología", 'Policiales', 'Espectaculo', 'Politicas', 'Interes General'];

export const Menu = () => {
  return (
    <div className="text-[--secundary] list-none flex flex-col justify-between bg-[--primary] shadow-xl pb-20 pt-20">
      <div className="  animacion-menu font-bold flex flex-col justify-center items-center gap-4  pb-20" >
        {
          category.map(categ => (
            <div key={categ}>
              <li className="hover:text-yellow-400 hover:cursor-pointer">
                <Link to={`/notices/${categ}`}>{categ}</Link>
              </li>
            </div>
          ))
        }
      </div>
      <li className="font-extrabold text-center"><Link to="/login">Iniciar sesion</Link></li>
    </div>

  )
}
