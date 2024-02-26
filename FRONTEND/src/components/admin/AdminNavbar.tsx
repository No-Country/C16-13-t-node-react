import { useState } from "react";
import { Busqueda, Menu } from "..";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

export const AdminNavbar = () => {
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
      <nav className="flex flex-row justify-between p-2 bg-[--primary] h-20 items-center">
        <div>LOGO</div>
        <div className="flex flex-row justify-center gap-6 m-6 text-[--secundary] cursor-pointer">
          <div onClick={iniciarBusqueda}>
            {busqueda ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faMagnifyingGlass} />}
          </div>
          <div onClick={mostrarMenu}>
            {menuHamb ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
          </div>
        </div>
      </nav>
      <div>
        {menuHamb && <Menu />}
        {busqueda && <Busqueda />}
      </div>
    </div>
  );
}
