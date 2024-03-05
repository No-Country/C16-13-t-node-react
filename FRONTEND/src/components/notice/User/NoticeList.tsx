import { useEffect, useState } from 'react';
import { Notice } from '../../../interface/NoticeModel';
import noticesService from '../../../service/noticesService';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../helpers/formatDate';


export const NoticeList = () => {

    const [noticias, setNoticias] = useState<Notice[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await noticesService.listarNoticias();
                setNoticias(data);
            } catch (error) {
                console.error('Error al obtener las noticias:', error);
            }
        };

        fetchData();
    }, []);

  

    return (
        <div className="mx-3">
            <h1 className="text-3xl font-bold mb-4 text-center my-8 uppercase">Ultimas noticias</h1>
            <ul className='flex flex-wrap gap-6 justify-center py-10'>
                {noticias.map((noticia) => (
                    <li key={noticia.noticeId} className="mb-8">
                        <Link to={`/notice/${noticia.noticeId}`}>
                            <img src={noticia.imgUrl} alt={noticia.title} className="mb-2 rounded-md" />
                            <h2 className="text-xl font-bold mb-2">{noticia.title}</h2>
                            <p className="text-sm mb-2">Publicada el: {formatDate(noticia.fecha)}</p>
                            <p className="text-sm">{noticia.category}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};


