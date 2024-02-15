import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <div className="bg-gray-300 flex justify-around">
        <Link to="">Links de interés</Link>
        <Link to="">Redes sociales</Link>
        <Link to="">Información legal</Link>
    </div>
  )
}
