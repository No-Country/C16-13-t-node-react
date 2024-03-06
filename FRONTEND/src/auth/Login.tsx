import { useState } from "react";
import { FormEvent } from 'react';
import { Link, useNavigate } from "react-router-dom"
import authService from "../service/authService";
import { Alerta } from '../components/utils'
import { Mensaje } from "../interface/MensajeAlerta";


export const Login = () => {

  const [mensaje, setMensaje] = useState<Mensaje>({ msg: '', error: false });
  const [formData, setFormData] = useState({
    email: '',
    pass: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: any) => {
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

      localStorage.setItem('token', data.token);
      setMensaje({ msg: 'Login successful', error: false });
      setTimeout(() => {
        navigate('/')
      }, 2000);
      
    } catch (error) {
      const errorData: string = error.response.data.errors[0].msg;
      setMensaje({ msg: errorData, error: true })
    }

  }


  return (
      <div className="font-sans text-gray-900 antialiased">

        <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-[#FFF]">

          <div className="absolute top-12 sm:top-56">
            <h2 className="font-bold text-3xl text-[--secondary-500]">
              Hola, te damos la <span className="bg-[--primary-100] text-white px-2 rounded-lg">bienvenida!</span>
            </h2>
          </div>

          <div className="w-auto sm:w-full sm:max-w-xl mt-6 px-6 py-4 border-[--primary-75] border-2 neumorphism_login sm:rounded-2xl overflow-hidden">
            <form onSubmit={handleSubmit}>

              <div className="py-8">
                <center>
                  <span className="text-2xl font-semibold text-[--secondary-500]">
                    Inicia sesión
                  </span>
                  
                </center>
                <hr className="border-1 border-black" />
              </div>

              <div>
                <label className="block font-medium text-sm text-[--secondary-300]" htmlFor="email" > {/* value="Email" */}
                  Email:
                </label>
                <input
                  id="email"
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='john_doe@gmail.com'
                  className="w-full rounded-md sm:rounded-xl py-2.5 px-4 border text-sm outline-[--primary-75] bg-[--neutral-75]"
                />
              </div>

              <div className="mt-4">
                <label className="block font-medium text-sm text-[--secondary-300]" htmlFor="password" > {/* value="Password" */}
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="pass"
                    type="password"
                    name="pass"
                    placeholder="Password"
                    value={formData.pass} 
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className='w-full rounded-md sm:rounded-xl py-2.5 px-4 border text-sm outline-[--primary-300] bg-[--neutral-75] '
                  />

                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button type="button" id="togglePassword" className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" >
                        <path d="M12 4.998c-1.836 0-3.356.389-4.617.971L3.707 2.293 2.293 3.707l3.315 3.316c-2.613 1.952-3.543 4.618-3.557 4.66l-.105.316.105.316C2.073 12.382 4.367 19 12 19c1.835 0 3.354-.389 4.615-.971l3.678 3.678 1.414-1.414-3.317-3.317c2.614-1.952 3.545-4.618 3.559-4.66l.105-.316-.105-.316c-.022-.068-2.316-6.686-9.949-6.686zM4.074 12c.103-.236.274-.586.521-.989l5.867 5.867C6.249 16.23 4.523 13.035 4.074 12zm9.247 4.907-7.48-7.481a8.138 8.138 0 0 1 1.188-.982l8.055 8.054a8.835 8.835 0 0 1-1.763.409zm3.648-1.352-1.541-1.541c.354-.596.572-1.28.572-2.015 0-.474-.099-.924-.255-1.349A.983.983 0 0 1 15 11a1 1 0 0 1-1-1c0-.439.288-.802.682-.936A3.97 3.97 0 0 0 12 7.999c-.735 0-1.419.218-2.015.572l-1.07-1.07A9.292 9.292 0 0 1 12 6.998c5.351 0 7.425 3.847 7.926 5a8.573 8.573 0 0 1-2.957 3.557z"></path>
                      </svg>
                    </button>
                  </div>

                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <label htmlFor="remember_me" className="flex items-center">
                  <input type="checkbox" id="remember_me" name="remember" className='rounded border-[--neutral-300] text-[--secondary-500] shadow-sm focus:ring-[--primary-300]' />
                  <span className="ms-2 text-xs sm:text-sm text-gray-600">
                    Recuérdame
                  </span>
                </label>

                <Link
                  to={'/reset-password'}
                  className="hover:underline text-xs sm:text-sm text-[--secondary-500] hover:text-gray-900 rounded-md sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--primary-300]"
                >
                  Recuperar contraseña
                </Link>
              </div>

              <div className="block mt-4">

                <button 
                  type="submit"
                  className='
                    w-full inline-flex justify-center items-center px-4 py-2 bg-[--primary-100] border border-transparent rounded-md sm:rounded-xl font-semibold text-xs text-[--secondary-300] uppercase tracking-widest 
                  hover:text-white hover:bg-[--primary-500] 
                    focus:bg-[--neutral-300] active:bg-[--neutral-500] focus:outline-none focus:ring-2 focus:ring-[--secondary-300] focus:ring-offset-2 
                    transition ease-in-out duration-150'>
                  Ingresar
                </button>

              </div>

              <div className="block mt-4">
                <span className="text-xs sm:text-sm text-[--secondary-500]">No tenés cuenta? <Link to={'/register'} className="hover:underline">Registrate</Link></span>
              </div>

            </form>
            {
              mensaje.msg !== "" && <Alerta mensaje={mensaje} />
            }
          </div>
        </div >
      </div >

  )
}
