import { Link } from "react-router-dom"
import { SocialMedia } from "./utils"

export const Footer = () => {
  return (
    <div className="bg-[--secondary-300] flex flex-row justify-around text-xs text-[--secundary] px-2 py-10 font-semibold">
        <li className="list-none text-[--primary] hover:text-[--warning-100] hover:cursor-pointer"><Link to="/">Sobre nosotros</Link></li>
        <li className="list-none text-[--primary] hover:text-[--warning-100] hover:cursor-pointer"><Link to="/">Información legal</Link></li>
        <SocialMedia/>
    </div>
  )
}
