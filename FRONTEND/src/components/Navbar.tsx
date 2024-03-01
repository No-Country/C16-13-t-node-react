import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Menu, Busqueda } from './';
import { Link } from 'react-router-dom';

export const Navbar = () => {

  const [menuHamb, setMenuHamb] = useState(false);
  const [busqueda, setBusqueda] = useState(false);

  const mostrarMenu = () => {
    setMenuHamb(!menuHamb);
  }

  const iniciarBusqueda = () => {
    setBusqueda(!busqueda);
  }

  return (
    <div className='bg-[--primary] px-3'>
      <nav className="flex flex-row justify-between items-center h-20">
        <div onClick={mostrarMenu}>
          {menuHamb ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
        </div>
        <Link to={`/notice`}>
          <div>LOGO</div>
        </Link>
        <div onClick={iniciarBusqueda}>
          {busqueda ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faMagnifyingGlass} />}
        </div>
      </nav>
      <div>
        {menuHamb && <Menu />}
        {busqueda && <Busqueda />}
      </div>

      {/* eliminar */}
      <div>
        <Link to="/noticeCreate">
          <button>Crear Noticia</button>
        </Link>
        <Link to="/noticeOptions">
          <button>Opciones Noticia</button>
        </Link>
      </div>
    </div>
  );
}

// return (
//   <div className='flex flex-col'>
//     <nav className="flex flex-row justify-between p-2 bg-[--primary] h-20 items-center">
//       <div>LOGO</div>
//       <div className="flex flex-row justify-center gap-6 m-6 text-[--secundary] cursor-pointer">
//         <div onClick={iniciarBusqueda}>
//           {busqueda ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faMagnifyingGlass} />}
//         </div>
//         <div onClick={mostrarMenu}>
//           {menuHamb ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
//         </div>
//       </div>
//     </nav>
//     <div>
//       {menuHamb && <Menu />}
//       {busqueda && <Busqueda />}
//     </div>
//   </div>
// );