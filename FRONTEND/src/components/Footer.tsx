import { Link } from "react-router-dom"
import { SocialMedia } from "./utils"

export const Footer = () => {
  return (
    <div className="bg-[--secondary-300] flex flex-col justify-center items-center sm:flex-row sm:justify-around text-sm lg:text-base text-[--secundary] px-2 py-5 font-semibold">
        <li className="list-none text-[--primary] hover:text-[--warning-100] hover:cursor-pointer my-2">
            <Link to="/">Sobre nosotros</Link>
        </li>
        <li className="list-none text-[--primary] hover:text-[--warning-100] hover:cursor-pointer my-2">
            <Link to="/">Información legal</Link>
        </li>
        <SocialMedia/>
    </div>
  )
}
