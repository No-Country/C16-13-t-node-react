import { Link } from "react-router-dom";


export const PanelAdmin = () => {


    return (
        <div className="">
            <h6 className="text-center py-2 uppercase font-bold shadow-md">uso exclusivo del administrador</h6>
            <div className="flex flex-row gap-6 p-6 uppercase font-semibold">
                <Link to="/noticeCreate">
                    <button>Crear Noticia</button>
                </Link>
                <Link to="/noticeOptions">
                    <button>Opciones Noticia</button>
                </Link>
            </div>
        </div>

    )
}
