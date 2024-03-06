import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const Busqueda = () => {
  return (
    <div className="animacion-menu pt-2 pb-6 flex items-center flex-row justify-center">
      <div className='relative'>
        <input type="text" className="rounded-lg h-8"/>
        <FontAwesomeIcon className="absolute block bottom-2 right-2 cursor-pointer" icon={faMagnifyingGlass} />
      </div>

    </div>
  )
}
