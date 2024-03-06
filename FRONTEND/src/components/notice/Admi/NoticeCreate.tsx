import React, { useLayoutEffect, useRef, useState } from 'react';
import { Notice } from '../../../interface/NoticeModel';
import noticesService from '../../../service/noticesService';
// import { useNavigate } from 'react-router-dom';
import { Mensaje } from '../../../interface/MensajeAlerta';
import { Alerta } from '../../utils';


const MIN_TEXTAREA_HEIGHT = 32;

export const NoticeCreate = () => {

  // const navigate = useNavigate();
  const [message, setMessage] = useState<Mensaje>({ msg: '', error: false });
  const categories = ['Deportes', 'Tecnología', 'Policiales', 'Espectáculo', 'Políticas', 'Interés General'];

  const textareaRef = useRef<HTMLTextAreaElement | undefined>();
  if( textareaRef && textareaRef.current ) return;
  
  const initialFormData: Notice = {
    title: '',
    subtitle: '',
    imgUrl: '',
    synopsis: '',
    category: ''
  };

  const [formData, setFormData] = useState<Notice>(initialFormData);

  useLayoutEffect(() => {
    textareaRef.current.style.height = 'inherit';
    textareaRef.current.style.height = `${Math.max(
      textareaRef.current.scrollHeight,
      MIN_TEXTAREA_HEIGHT
    )}px`;
  }, [formData.synopsis]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log(formData);
    
    event.preventDefault();
    try {
      await noticesService.agregarNoticia(formData);
      setMessage({ msg: 'Notice create succesfully', error: false });
      setTimeout(() => {
        // navigate('/notice');
      }, 1000);
    } catch (error) {
      console.error('Error al agregar la noticia:', error);
      setMessage({ msg: 'Error al agregar la noticia ', error: true})
    }
  };

  

  return (
    <div className="font-sans text-[--neutral-500] antialiased">
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FFF]">

        <div className=''>
          <form className='shadow-lg p-4 px-4 md:p-8 mb-6 border-[--primary-75] border-2 neumorphism_card' onSubmit={handleSubmit}>

            <div className="grid gap text-sm sm:text-md grid-cols-1 lg:grid-cols-3">
              <h2 className="text-3xl font-bold mb-4 text-center">Crear Noticia</h2>
            </div>

            <div className='py-1'>
              <label htmlFor="title">
                Título
              </label>
              <input 
                className='h-10 border mt-1 rounded-xl px-4 w-full bg-[--neutral-100] outline-[--primary-300]'
                type="text" 
                id="title" 
                name="title" 
                value={formData.title}
                onChange={handleInputChange}
                placeholder='Escribe el título de la noticia...'
                />
            </div>
            <div className='py-1'>
              <label htmlFor="subtitle">Subtítulo:</label>
              <input 
                className='h-10 border mt-1 rounded-xl px-4 w-full bg-[--neutral-100] outline-[--primary-300]'
                type="text" 
                id="subtitle" 
                name="subtitle" 
                value={formData.subtitle}
                onChange={handleInputChange} 
                placeholder='Escribe el subtítulo de la noticia...'
              />
            </div>
            <div className='py-1'>
              <label htmlFor="imgUrl">URL de la imagen:</label>
              <input 
                className='h-10 border mt-1 rounded-xl px-4 w-full bg-[--neutral-100] outline-[--primary-300]'
                type="text" 
                id="imgUrl" 
                name="imgUrl" 
                value={formData.imgUrl}
                onChange={handleInputChange}
                placeholder='Escribe la URL de la imagen...'
              />
            </div>
            <div className='py-1'>
              <label htmlFor="synopsis">Sinopsis:</label>
              <textarea 
                className='
                  border mt-1 rounded-xl w-full bg-[--neutral-100] 
                  blcok p-2.5 text-sm text-[--neutral-500] outline-[--primary-300]
                '
                id="synopsis" 
                name="synopsis" 
                value={formData.synopsis}
                onChange={handleInputChange}
                placeholder='Escribe una sinopsis de la noticia...'
                rows={3}
                ref={textareaRef}
              />
            </div>
            <div className='py-3 pb-6'>
              <div className="relative inline-flex items-center">
                <label className='pr-4' htmlFor="category">Categoría:</label>
                <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
                <select 
                  className='border border-[--neutral-300] rounded-md sm:rounded-xl text-[--neutral-300] h-10 px-3 pr-8 hover:border-[--neutral-400] focus:outline-none appearance-none'
                  id="category" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="md:col-span-5 text-right">
              <button 
                className='bg-[--primary-300] hover:bg-[--primary-500] text-white font-bold py-2 px-4 rounded-md inline-flex items-end '
                type="submit"
              >Agregar Noticia</button>
            </div>
          </form>
          {
              message.msg !== "" && <Alerta mensaje={message} />
          }
        </div>

      </div>
    </div>
  );
};
