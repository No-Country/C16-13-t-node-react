import React from 'react';
import { useParams } from 'react-router-dom';
import { Notice } from '../../interface/NoticeModel';
import noticesService from '../../service/noticesService';

const NoticeComplete: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    const [noticia, setNoticia] = React.useState<Notice | null>(null);

    React.useEffect(() => {
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
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4 text-center">Noticias</h1>
            <img src={noticia.imgUrl} alt={noticia.title} />
            <h1>{noticia.title}</h1>
            <h1>{noticia.subtitle}</h1>
            <p>{noticia.synopsis}</p>
            {/* Agrega aquí los demás detalles de la noticia */}
        </div>
    );
};

export default NoticeComplete;