import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Menu } from '.';


export const Navbar = () => {

  const [menuHamb, setMenuHamb] = useState(false)

  const mostrarMenu = () => {
    setMenuHamb(!menuHamb)
  }

  console.log(menuHamb)
  return (

    <div className='flex flex-col'>
      <nav className="flex flex-row justify-between p-2 bg-gray-300 h-20 items-center">

        <div>LOGO</div>

        <div className="flex flex-row justify-center gap-4 m-6">

          <div>
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
          </div>

          <div onClick={() => mostrarMenu()}>
            {
              menuHamb ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />
            }

          </div>
        </div>
      </nav>
      <Menu />
    </div>

  )
}
