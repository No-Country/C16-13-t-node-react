import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareTwitter } from "@fortawesome/free-brands-svg-icons";




export const Login = () => {
  return (
    <div className="h-screen grid place-items-center bg-[#F2F2F2]">
      <form className="w-80">
        <h2 className="text-center uppercase font-extrabold my-4">Inicia Sesión</h2>
        <p>E-mail</p>
        <div className="mb-5">
          <input type="email" className="border-solid outline-2 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <p>Contraseña</p>
        <div className="mb-5">
          <input type="password" id="passwordInput" className="border-solid outline-2 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
      </form>
      <div className="flex flex-row gap-11 p-3">
        <label><input type="checkbox" /> Recuerdame</label>
        <a href="#">Recuperar contraseña</a>
      </div>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar Sesión</button>
      <li className="list-none">¿No tienes cuenta?<Link to="/register"> Regístrate</Link></li>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 bg-gray-900 border-0 dark:bg-gray-900" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">O también</span>
      </div>
      <div className="flex gap-12 mb-8 ">
        <Link to={""}><FontAwesomeIcon icon={faSquareInstagram} size="2x"/></Link>
        <Link to={""}><FontAwesomeIcon icon={faSquareFacebook}  size="2x"/></Link>
        <Link to={""}><FontAwesomeIcon icon={faSquareTwitter}   size="2x"/></Link>
      </div>
    </div>
  )
}
