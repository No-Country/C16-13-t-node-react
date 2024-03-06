import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import noticesService from '../../../service/noticesService';
import { Notice } from '../../../interface/NoticeModel';
import { SkelletonNotices } from '../../utils/skelletons/NoticeListSkelleton';
import { NoticeComponent } from './NoticeCard';


export const NoticeList = () => {

    const { category } = useParams<{ category: string }>();

    const [noticias, setNoticias] = useState<Notice[]>();

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
    }, [noticias]);

    if (!noticias) {
        return (
            <div className="max-w-screen px-6 pb-10 mx-auto animate-pulse w-full">
                <h1 className="w-80 h-9 mx-auto bg-gray-300 rounded-3xl my-8"></h1>
                <ul className='grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6'>
                    <SkelletonNotices />
                    <SkelletonNotices />
                    <SkelletonNotices />
                    <SkelletonNotices />
                </ul>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-screen px-4 pb-10 w-full">
            <h1 className="text-3xl font-bold text-center my-8 uppercase">Ultimas noticias</h1>
            <ul className='grid w-full sm:grid-cols-2 xl:grid-cols-4 gap-6'>
                {
                    category
                    ? ( <NoticeListPerCategory news={noticias}/>)
                    : noticias.map((noticia) => (
                        <NoticeComponent key={noticia.title} noticia={ noticia } />
                    ))
                    
                }

            </ul>
        </div>
    );
};

interface Props {
    news: any;
}

const NoticeListPerCategory = ({ news }: Props ) => {

    const { category } = useParams<{ category: string }>();

    const [noticias, setNoticias] = useState<Notice[]>();

    useEffect(() => {
      const noticesPerCategory = news.filter((noticia: Notice) => {
          return noticia.category === category;
      });
      category
    
      return () => {
        setNoticias(noticesPerCategory);
      }
    }, [category])

    return (
        <>
            {
                noticias?.length === 0 
                ? ( 
                    <div>
                        <h2>No hay noticias con esa categoría</h2>
                    </div>  
                )
                : noticias?.map((noticia) => (
                    <NoticeComponent key={noticia.title} noticia={ noticia } />
                ))
                
            }
        </>
    )
}


