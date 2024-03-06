import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Notice } from "../../../interface/NoticeModel";
import { NoticeComponent } from "./NoticeCard";

interface Props {
  news: any;
}

export const NoticeListPerCategory = ({ news }: Props ) => {

  const { category } = useParams<{ category: string }>();

  const [noticias, setNoticias] = useState<Notice[]>();

  useEffect(() => {
    const noticesPerCategory = news.filter((noticia: Notice) => {
        return noticia.category === category;
    });
  
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
