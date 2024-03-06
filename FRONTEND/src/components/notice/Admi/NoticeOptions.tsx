import { useState, useEffect } from 'react';
import { ResponsiveTable } from "responsive-table-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Notice } from '../../../interface/NoticeModel';
import noticesService from '../../../service/noticesService';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export const NoticeOptions = () => {

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

  const handleEdit = (noticeId?: string) => {
    if (noticeId) {
        console.log('Editar noticia con ID:', noticeId);
    }
  };

  const handleDelete = async (noticeId?: string) => {
    if (noticeId) {
        try {
          await noticesService.eliminarNoticia(noticeId);
          setNoticias(noticias.filter(noticia => noticia.noticeId !== noticeId));
        } catch (error) {
          console.error('Error al eliminar la noticia:', error);
        }
    }
  };

  const columns = [
    {
      "id": "title",
      "text": "Título"
    },
    {
      "id": "category",
      "text": "Categoría"
    },
    {
      "id": "synopsis",
      "text": "Sinopsis"
    },
    {
      "id": "date",
      "text": "Fecha"
    },
    {
      "id": "actions",
      "text": "Acciones"
    }
  ]

  const data = noticias.map( (noticia) => {
      return ({
        "title": `${noticia.title}`,
        "category": `${ noticia.category }`,
        "synopsis": `${ noticia.synopsis }`,
        "date": `${ noticia.fecha }`,
        "actions": 
            <div className='flex justify-between items-center w-48 py-2 sm:py-0'>
                <button className="outline font-medium text-[--primary-300] rounded-xl hover:text-white hover:bg-[--primary-300] py-1 px-2" onClick={() => handleEdit(noticia.noticeId)}>Editar <FontAwesomeIcon icon={faPenToSquare} /></button>
                <button className='outline font-medium text-[--alert-300] rounded-xl hover:text-white hover:bg-[--alert-300] py-1 px-2' onClick={() => handleDelete(noticia.noticeId)}>Eliminar <FontAwesomeIcon icon={faTrashCan} /></button>
            </div>
        
      })
  })

  return (
      <div className="pb-6 px-3">
            <h1 className="text-3xl font-bold mb-4 text-center">Tabla de Noticias</h1>
            <div className='p-2'>
                <ResponsiveTable columns={columns} data={data} />
            </div>
      </div>
  )
};
