import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Menu, Busqueda } from './';
import { Link } from 'react-router-dom';
import { Logo } from './utils';
import { PanelAdmin } from './notice/Admi';
import { UserContext } from '../context/UserProvider';
import { formatDate } from '../helpers/formatDate';

function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

export const Navbar = () => {
  //USER LOGEADO EN EL ESTADO GENERAL. DEJO ESTE COMENTARIO PARA QUE TOMEN LA REFERENCIA PARA LA BAJADA DE DATOS GLOBALES
  const { user } = useContext(UserContext);
  
  
  const [menuHamb, setMenuHamb] = useState(false);
  const [busqueda, setBusqueda] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const mostrarMenu = () => {
    setMenuHamb(!menuHamb);
  }

  const iniciarBusqueda = () => {
    setBusqueda(!busqueda);
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if( windowSize.innerWidth >= 1023 ) {
      
  }
  

  const horaActual = new Date();
  const fecha = formatDate(horaActual);

  return (
      <div className='flex flex-col transition-all'>
          <div className='bg-[--secondary-300] px-6 py-3 pb-10 lg:pb-0'>
              <nav className="flex flex-row justify-between items-center h-20">
                  <div className='visible' onClick={mostrarMenu}>
                      { 
                        menuHamb
                        ? <FontAwesomeIcon icon={faXmark} size="2x" className='text-[--primary-300] lg:invisible' /> 
                        : <FontAwesomeIcon icon={faBars} size="2x" className='text-[--primary-300] lg:invisible' />
                      }
                  </div>
                  <Link to={`/notice`}>
                      <Logo dark={false} />
                  </Link>
                  <div onClick={iniciarBusqueda} className=''>
                      {busqueda ? <FontAwesomeIcon icon={faXmark} size="2x" className='text-[--primary-300]' /> : <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" className='text-[--primary-300]' />}
                  </div>
              </nav>
              <div className=''>
                  {menuHamb && <Menu />}
                  {busqueda && <Busqueda />}
              </div>


          </div>

          {/* panel de administrador */}

          {
              (user.rol === "administrator") ? <PanelAdmin /> : <div>
                  <h6 className='p-2 font-semibold'>ultima actualizacion: {fecha}</h6>
              </div>
          }
      
      </div>
  );
}
