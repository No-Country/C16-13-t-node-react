import React, { useState } from 'react';
import { Notice } from '../../../interface/NoticeModel';
import noticesService from '../../../service/noticesService';
// import { useNavigate } from 'react-router-dom';

export const NoticeCreate = () => {

  // const navigate = useNavigate();

  const categories = ['Deportes', 'Tecnología', 'Policiales', 'Espectáculo', 'Políticas', 'Interés General'];

  const initialFormData: Notice = {
    title: '',
    subtitle: '',
    imgUrl: '',
    synopsis: '',
    category: ''
  };

  const [formData, setFormData] = useState<Notice>(initialFormData);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    
    event.preventDefault();
    try {
      await noticesService.agregarNoticia(formData);
      // navigate('/notice');
    } catch (error) {
      console.error('Error al agregar la noticia:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center">Crear Noticia</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="subtitle">Subtítulo:</label>
          <input type="text" id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="imgUrl">URL de la imagen:</label>
          <input type="text" id="imgUrl" name="imgUrl" value={formData.imgUrl} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="synopsis">Sinopsis:</label>
          <textarea id="synopsis" name="synopsis" value={formData.synopsis} onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label htmlFor="category">Categoría:</label>
          <select id="category" name="category" value={formData.category} onChange={handleInputChange}>
            <option value="">Selecciona una categoría</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <button type="submit">Agregar Noticia</button>
      </form>
    </div>
  );
};
