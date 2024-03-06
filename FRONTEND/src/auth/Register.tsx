import {  useState } from "react";
import { FormEvent } from 'react'; 
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { Alerta } from "../components/utils";
import userAdminService from '../service/userAdminService';
import { Mensaje } from "../interface/MensajeAlerta";


export const Register = () => {

  const admin = import.meta.env.VITE_ADMIN;
  const navigate = useNavigate();

  const { pathname } = useResolvedPath('');
  const [mensaje, setMensaje] = useState<Mensaje>({ msg: '', error: false });
  const [repetirPass, setRepetirPass] = useState("");
  const [comprobarRol, setComprobarRol] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    pass: '',
    imgUrl: '',
    rol: 'user'
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async(e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if(formData.pass !== repetirPass){
      setMensaje({msg: "Las contraseñas deben cohincidir", error: true});
      return;
    }

    if(comprobarRol === admin){
      formData.rol === "administrator"
    }
    try {
      console.log(formData)
      const data = await userAdminService.registrarUsuario(formData);
      console.log(data);
      setMensaje({ msg: "Registrado exitosamente", error: false })

      setTimeout(() => {
        navigate('/')
      }, 2000);
    } catch (error) {
      const errorData: string = error.response.data.errors[0].msg;
      setMensaje({ msg: errorData, error: true })
    }
  };

  return (
    <div className="font-sans text-gray-900 antialiased">
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FFF]">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            {
              ( pathname === '/register')
              ? (
                <>
                  <h2 className="text-center sm:text-start font-semibold text-xl text-gray-600">
                    <span className="bg-[--primary-300] text-white px-2 py-1 rounded-lg">Registrate</span>
                  </h2>
                  <p className="text-center sm:text-start text-gray-500 mb-6">
                    Se necesita de la siguiente información para crear la cuenta
                  </p>
                </>
              )
              : (
                <>
                  <h2 className="text-center font-semibold text-xl text-gray-600">
                    Nuevo usuario
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Crea un nuevo usuario y agrégalo, eh informale por correo electrónico
                  </p>
                </>
              )
            }
    
            <form onSubmit={handleSubmit} className="shadow-lg p-4 px-4 md:p-8 mb-6 bg-[#F2F2F2] rounded-2xl">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
    
                <div className="text-gray-600">
                  <p className="font-semibold text-lg">
                    Datos personales
                  </p>
                  <p className="font-medium">
                    Por favor llena todos los campos
                  </p>
                </div>
    
                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
    
                    <div className="md:col-span-2">
                      <label htmlFor="name">Nombre</label>
                      <input type="text" name="name" id="name" value={formData.name} onChange={handleChange}
                        className="h-10 border mt-1 rounded-xl px-4 w-full bg-[#FFF] outline-[--primary-300]" />
                    </div>
      
                    <div className="md:col-span-2">
                      <label htmlFor="lastName">Apellido</label>
                      <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange}
                        className="h-10 border mt-1 rounded-xl px-4 w-full bg-[#FFF] outline-[--primary-300]" />
                    </div>
      
                    <div className="md:col-span-4">
                      <label htmlFor="email">Correo electrónico</label>
                      <input type="email" name="email" id="email" value={formData.email} onChange={handleChange}
                        className="h-10 border mt-1 rounded-xl px-4 w-full bg-[#FFF] outline-[--primary-300]"
                        placeholder="email@domain.com" />
                    </div>
      
                    {
                      ( pathname === '/register' )
                      ? (
                        <>
                          <div className="col-span-2 md:col-span-2">
                            <label htmlFor="pass">Contraseña</label>
                            <input type="password" name="pass" id="pass" value={formData.pass} onChange={handleChange}
                              className="h-10 border mt-1 rounded-xl px-4 w-full bg-[#FFF] outline-[--primary-300]"
                              placeholder="********" />
                          </div>
                          <div className="col-span-2 md:col-span-2">
                            <label htmlFor="repetirContraseña">Repetir contraseña</label>
                            <input type="password" name="repetirContraseña" id="repetirContraseña" value={repetirPass}
                              onChange={(e)=> setRepetirPass(e.target.value)}
                            className="h-10 border mt-1 rounded-xl px-4 w-full bg-[#FFF] outline-[--primary-300]"
                            placeholder="********"
                            />
                          </div>
                        </>
                      )
                      : (
                        <div className="md:col-span-4">
                          <label htmlFor="pass">Contraseña</label>
                          <input type="password" name="pass" id="pass" value={formData.pass} onChange={handleChange}
                            className="h-10 border mt-1 rounded-xl px-4 w-full bg-[#FFF] outline-[--primary-300]"
                            placeholder="********" />
                        </div>
                      )
                    }
      
                    <div className="md:col-span-4">
                      <label htmlFor="imgUrl">URL de la foto de perfil</label>
                      <input type="text" name="imgUrl" id="imgUrl" value={formData.imgUrl} onChange={handleChange}
                        className="h-10 border mt-1 rounded-xl px-4 w-full bg-[#FFF] outline-[--primary-300]"
                        placeholder="https://www.example.com" />
                    </div>
      
                    <div className="md:col-span-4">
                      <label htmlFor="admin">Contraseña admin/superadmin</label>
                      <input type="password" onChange={e=> setComprobarRol(e.target.value)}
                      value={comprobarRol}
                      className="h-10 border mt-1 rounded-xl px-4 w-full bg-[#FFF] outline-[--primary-300]"
                      placeholder="password de admin si posees"
                      />
                    </div>

                    {
                      ( pathname === '/register' )
                      ? (
                        <></>
                      )
                      : (
                        <div className="md:col-span-5">
                          <div className="inline-flex items-center">
                            <input type="checkbox" name="billing_same" id="billing_same" className="htmlForm-checkbox" />
                            <label htmlFor="billing_same" className="ml-2">Enviar email de confirmación</label>
                          </div>
                        </div>
                      )
                    }

                    <div className="md:col-span-5 text-right">

                      <div className="inline-flex items-end">
                        <button type="submit"
                          className="bg-[--primary-300] hover:bg-[--primary-500] text-white font-bold py-2 px-4 rounded-md">
                          Registrar
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              {
                ( pathname === '/register')
                ? (
                  <div className="sm:relative">
                    <div className="sm:absolute sm:bottom-1">
                      <span className="text-xs sm:text-sm">¿Ya tienes cuenta?
                        <Link to={'/login'} className="hover:underline"> Logeate</Link>
                      </span>
                    </div>
                  </div>
                )
                : (
                  <>
                    {/* <span>nuevo usuario</span> */}
                  </>
                )
              }
            </form>
            {
              mensaje.msg !== "" &&
              <Alerta mensaje={mensaje} />
            }
          </div>
    
        </div>
      </div>
    </div>
  );
};