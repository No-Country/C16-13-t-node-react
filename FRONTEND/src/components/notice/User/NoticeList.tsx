import { useEffect, useState } from 'react';
import { Notice } from '../../../interface/NoticeModel';
import noticesService from '../../../service/noticesService';
import { Link } from 'react-router-dom';

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
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[--neutra-300] py-6 sm:py-12">
          <div className="mx-auto max-w-screen-xl px-4 w-full">
              <h1 className="text-3xl font-bold mb-4 text-center">Noticias</h1>
              <ul>
                  {noticias.map((noticia) => (
                      <li key={noticia.noticeId} className="mb-8">
                          <Link to={`/notice/${noticia.noticeId}`}>
                              <img src={noticia.imgUrl} alt={noticia.title} className="mb-2 rounded-md" />
                              <h2 className="text-xl font-bold mb-2">{noticia.title}</h2>
                              <p className="text-sm mb-2">Fecha: {noticia.fecha}</p>
                              <p className="text-sm">{noticia.category}</p>
                          </Link>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
    );
};


