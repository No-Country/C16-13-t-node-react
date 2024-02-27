import { useState } from "react";
import { FormEvent } from 'react';
import { Link } from "react-router-dom"
import authService from "../service/authService";
import { Alerta } from '../components/utils'
import { Mensaje } from "../interface/MensajeAlerta";
/*import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faSquareInstagram, faSquareTwitter } from "@fortawesome/free-brands-svg-icons";*/AbstractRange




export const Login = () => {

  const [mensaje, setMensaje] = useState<Mensaje>({ msg: '', error: false });
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = await authService.authenticateUser(formData);
      console.log(data)
    } catch (error) {
      const errorData: string = error.response.data.errors[0].msg;
      setMensaje({ msg: errorData, error: true })
    }

  }


  return (
    <div className="h-screen grid place-items-center bg-[--primary]">
      <form className="w-80 p-6" onSubmit={handleSubmit}>
        <h2 className="text-center uppercase font-extrabold my-4">Inicia Sesión</h2>
        <p>E-mail</p>
        <div className="mb-5">
          <input id="email" name="email" value={formData.email} onChange={handleChange} type="email" className="border-solid outline-2 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required />
        </div>
        <p>Contraseña</p>
        <div className="mb-5">
          <input type="password" id="pass" name="pass" value={formData.pass} onChange={handleChange} className="border-solid outline-2 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <div className="flex flex-row gap-11 p-3">
          <label><input type="checkbox" /> Recuerdame</label>
          <a href="#">Recuperar contraseña</a>
        </div>
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar Sesión</button>
        <li className="list-none">¿No tienes cuenta?<Link to="/register"> Regístrate</Link></li>

        {/* <div className="flex gap-12 mb-8 ">
        <Link to={""}><FontAwesomeIcon icon={faSquareInstagram} size="2x"/></Link>
        <Link to={""}><FontAwesomeIcon icon={faSquareFacebook}  size="2x"/></Link>
        <Link to={""}><FontAwesomeIcon icon={faSquareTwitter}   size="2x"/></Link>
      </div>*/}


      </form>
      {
        mensaje.msg !== "" && <Alerta mensaje={mensaje} />
      }
    </div>
  )
}
