import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import loader from "../../Images/loading-buffering.gif";
import notFound from "../../Images/videogame-not-found.jpg";

import Videogame from './Videogame/Videogame';
import Pagination from "./Pagination/Pagination";
import style from './Videogames.module.css';

export default function Videogames() {
  const videogames = useSelector((state) => state.videogamesToShow);
  const loading = useSelector((state) => state.loading);
  const submit = useSelector((state) => state.submit);
// ------------ PAGINATION --------------
  const currentPage    = useSelector(state => state.currentPage);
  const videogamesForPage = useSelector(state => state.videogamesForPage);
  const end = currentPage * videogamesForPage;
  const start = end - videogamesForPage;
  const currentVideogames = videogames?.slice(start, end);
  
  // useEffect(() => {
  // }, [videogames]);
return (
        <div className={style.container}>
          {loading ? (
          <img src={loader} alt="Loading..." className={style.loader} />
        ): typeof currentVideogames[0] === "object" ? (
          <div className={style.cards}>
           {currentVideogames &&
            currentVideogames.map((vg) => 
                  <Videogame 
                  key={vg.id}
                  id={vg.id}
                  name={vg.name} 
                  image={vg.image}
                  rating={vg.rating}
                  genres={vg.genres}
                  source={vg.source}
                  />
                  )
              }
             </div>
             ):(
              submit==="Not Found"?<div className={style.notFound}>
                            <img
                              src={notFound}
                              alt="Videogame Not Found"
                              width="800px"
                              height="400px"
                            />
                          </div>
                          :null
            )}
           <Pagination
            className={style.pagination}
            videogames={videogames}
          />
        </div>
      );
}; 
