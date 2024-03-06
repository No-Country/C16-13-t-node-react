import { Link } from "react-router-dom"

import { Notice } from "../../../interface/NoticeModel"
import { formatDate } from "../../../helpers/formatDate"

interface Props {
  noticia: Notice
}

export const NoticeComponent = ({noticia}: Props) => {

    return (
        <li key={noticia.noticeId} className="relative flex flex-col shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer">
            <Link to={`/notice/${noticia.noticeId}`}>
                <div className="h-auto overflow-hidden">
                    <div className='h-44 overflow-hidden relative'>
                        <img src={noticia.imgUrl} alt={noticia.title} className="rounded-md" />  
                    </div>
                </div>
                <div className="py-4 px-3">
                    <h2 className="text-xl font-bold mb-2">{ (noticia.title.length >= 28) ? noticia.title.slice(0, 28) + ' ...' : noticia.title  }</h2>
                    <p className="text-sm mb-2">{formatDate(noticia.fecha)}</p>
                    <p className="text-sm md:text-md">{noticia.category}</p>
                </div>
            </Link>
        </li>
    )
}
