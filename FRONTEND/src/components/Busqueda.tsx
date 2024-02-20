import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export const Busqueda = () => {
  return (
    <div className="animacion-menu bg-[--primary] pt-2 pb-6 flex items-center flex-row justify-center">
      <div>
        <input type="text" className="rounded-lg h-8"/>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>

    </div>
  )
}
