import {  useState } from "react";
import { Link } from "react-router-dom";
import { Alerta } from "../components/utils";
import userAdminService from '../service/userAdminService';


export const Register = () => {


  const [repetirPass, setRepetirPass] = useState("");
  const [mensaje, setMensaje] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    pass: '',
    imgUrl: '',
    rol: 'usuario'
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const data = await userAdminService.registrarUsuario(formData);
      console.log(data);
      setMensaje({ msj: "Registrado exitosamente", error: false })
      console.log(mensaje)
    } catch (error) {
      setMensaje({ msj: "Error al registrar el usuario", error: true })
    }
  };


  return (
    <div className=" grid place-items-center bg-[--primary]">
      <h2 className="text-center uppercase font-extrabold">Registrate</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-2">
          <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
        </div>
        <div className="mb-2">
          <label htmlFor="contraseña" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
          <input type="password" id="pass" name="pass" value={formData.pass} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-2">
          <label htmlFor="repetirContraseña" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repite la contraseña</label>
          <input type="password" id="repetirContraseña" name="repetirContraseña" value={repetirPass} onChange={(e) => setRepetirPass(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-2">
          <label htmlFor="urlfoto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL de la foto de perfil</label>
          <input type="text" id="imgUrl" name="imgUrl" value={formData.imgUrl} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">contraseña admin/superadmin</label>
          <input type="password" onChange={handleChange} value={formData.rol} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="password de admin si posees" />
        </div>
        <li className="list-none mb-2">¿Ya tienes cuenta?<Link to="/login"> Leogeate</Link></li>
        <button type="submit" className="text-white bg-[--secundary] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrarse</button>

        {
          <Alerta mensaje={mensaje} />
        }


      </form>
    </div>
  );
};