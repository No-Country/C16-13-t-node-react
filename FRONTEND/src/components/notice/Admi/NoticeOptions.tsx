import React, { useState, useEffect } from 'react';
import { Notice } from '../../../interface/NoticeModel';
import noticesService from '../../../service/noticesService';

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

  return (
    <div className="mx-3">
      <h1 className="text-3xl font-bold mb-4 text-center">Noticias</h1>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">Título</th>
            <th className="py-2 px-4 border">Categoría</th>
            <th className="py-2 px-4 border">Sinopsis</th>
            <th className="py-2 px-4 border">Fecha</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {noticias.map(noticia => (
            <tr key={noticia.noticeId} className="border-b border-gray-200">
              <td className="py-2 px-4 border">{noticia.title}</td>
              <td className="py-2 px-4 border">{noticia.category}</td>
              <td className="py-2 px-4 border">{noticia.synopsis}</td>
              <td className="py-2 px-4 border">{noticia.fecha}</td>
              <td className="py-2 px-4 border">
                <button className="mr-2" onClick={() => handleEdit(noticia.noticeId)}>Editar</button>
                <button onClick={() => handleDelete(noticia.noticeId)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
