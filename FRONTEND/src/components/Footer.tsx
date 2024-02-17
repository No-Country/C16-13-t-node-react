import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <div className="bg-gray-300 flex flex-col justify-around text-xs">
        <li className="list-none"><Link to="/">Links de interés</Link></li>
        <li className="list-none"> <Link to="/">Redes sociales</Link></li>
        <li className="list-none"><Link to="/">Información legal</Link></li>
    </div>
  )
}
