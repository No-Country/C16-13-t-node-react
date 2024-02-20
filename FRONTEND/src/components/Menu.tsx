import { Link } from "react-router-dom";

const category: string[] = ["Deportes", "Tecnología", 'Policiales', 'Espectaculo', 'Politicas', 'Interes General'];

export const Menu = () => {
  return (
    <div className="text-[--neutral] list-none bg-[--secundary] animacion-menu font-bold flex flex-col justify-center items-center gap-4 pb-28 pt-20 shadow-xl" >
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
  )
}
