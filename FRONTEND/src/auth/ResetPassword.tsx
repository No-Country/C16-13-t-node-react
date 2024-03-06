import { Link } from 'react-router-dom';


export const ResetPassword = () => {
  return (
    <div className="font-sans text-gray-900 antialiased">

      <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-[#FFF]">
        <div className="absolute top-12 sm:top-32">
          <h2 className="font-bold text-3xl">
            Recupera <span className="bg-[--primary-300] text-white px-2 rounded-lg">contraseña</span>
          </h2>
        </div>


        <div className="w-auto sm:w-full sm:max-w-xl mt-6 px-6 py-4 bg-[#F2F2F2] shadow-md overflow-hidden rounded-2xl">
          <form method="POST" action="{{ route('login') }}">

            <div className="py-8">
              <center>
                <span className="text-2xl font-semibold">
                  Para poder recuperar tu contraseñan, necesitamos tu email
                </span>
              </center>
              <hr className="border-1 border-black" />
            </div>

            <div>
              <label className="block font-medium text-sm text-gray-700" htmlFor="email" > {/* value="Email" */}
                Email:
              </label> 
              <input 
                type='email'
                name='email'
                placeholder='john_doe@gmail.com'
                className="w-full rounded-xl py-2.5 px-4 border text-sm outline-[--primary-300]" 
              />
            </div>

            <div className="block mt-4">

              <button className='w-full inline-flex justify-center items-center px-4 py-2 bg-[--primary-300] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-900 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150'>
                Enviar|
              </button>

            </div>

            <div className="block mt-4">
              <span className="text-xs sm:text-sm">No tenés cuenta? <Link to={'/register'} className="hover:underline">Registrate</Link></span>
            </div>

          </form>
        </div>
      </div >
    </div >
  )
}
