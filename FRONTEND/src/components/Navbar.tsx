import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import {Menu, Busqueda } from './';

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
    <div className='flex flex-col'>
      <nav className="flex flex-row justify-between p-2 bg-[--secundary] h-20 items-center">
        <div>LOGO</div>
        <div className="flex flex-row justify-center gap-6 m-6 text-[--neutral]">
          <div onClick={iniciarBusqueda}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <div onClick={mostrarMenu}>
            {menuHamb ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
          </div>
        </div>
      </nav>
      <div>
        {busqueda && <Busqueda />}
        {menuHamb && <Menu />}
      </div>
    </div>
  );
}
