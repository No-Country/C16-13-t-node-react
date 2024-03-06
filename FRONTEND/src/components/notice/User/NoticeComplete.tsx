import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { Notice } from '../../../interface/NoticeModel';
import noticesService from '../../../service/noticesService';
import { NoticeSkelleton } from '../../utils/skelletons/NoticeSkelleton';

const imageShadow = {
    backgroundImage: 'linear-gradient(180deg, transparent, rgba(0,0,0,.7))'
}

const h24em = {
    height: '24em'
}

export const NoticeComplete = () => {

    const { id } = useParams<{ id: string }>();

    const [noticia, setNoticia] = useState<Notice | null>(null);

    useEffect(() => {
        const fetchNoticia = async () => {
            try {
                if (id) { // Verificar si id no es undefined
                    const data = await noticesService.getNoticiaById(id);
                    console.log(data);
                    setNoticia(data);
                }
            } catch (error) {
                console.error('Error al obtener la noticia:', error);
            }
        };
        fetchNoticia();
    }, [id]);

    if (!noticia) {
        return (
          <div className="mb-10 mx-3 animate-pulse">
            <div className="rounded-lg bg-[--neutral-100] h-4 w-20"></div>
            <h1 className="mb-4 mx-auto rounded-2xl bg-[--neutral-100] w-40 h-9 "></h1>
            <NoticeSkelleton />
        </div>
        );
    }

    return (
        <div className="mb-10 mx-3">

            <Link to={'/'} className='flex justify-start items-center gap-2 text-[--primary-300] hover:text-[--secondary-500]'>
                <FontAwesomeIcon icon={faArrowLeft}/>
                <span className='text-xs md:text-base font-normal'>Noticias</span>
            </Link>

            <h1 className="text-3xl font-bold mb-4 text-center">Noticia</h1>

            <div className='mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative' style={ h24em }>
                <div className="absolute left-0 bottom-0 w-full h-full z-10 rounded-3xl" style={ imageShadow }></div>
                <img className='absolute left-0 top-0 w-full h-full z-0 object-cover rounded-3xl' src={noticia.imgUrl} alt={noticia.title} />
                <div className="p-4 absolute bottom-0 left-0 z-20">
                    <span className='px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2'>{noticia.category}</span>
                    <h1 className='text-2xl md:text-4xl font-semibold text-gray-100 leading-tight'>{noticia.title}</h1>
                </div>
            </div>

            <div className="px-4 lg:px-0 mt-10 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                <h2 className='text-xl md:text-2xl my-2'>{noticia.subtitle}</h2>
                <p className='text-lg md:text-xl pb-6'>{noticia.synopsis}</p>
            </div>

        </div>
    );
};
