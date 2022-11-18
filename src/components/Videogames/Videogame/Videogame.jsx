import React from 'react';
import { Link } from "react-router-dom";
import style from "./Videogame.module.css";

function Videogame({ id, name, image, rating, genres, source }) {

    return (
      <div className={style.videogame}> 
        {
        source==="db"?
          <div className={style.edit}><button className={style.db}>DB</button></div>
        :null
        }

        <Link to={`/home/${id}`} className={style.link}>
          <img src={image} alt="" width="120px" className={style.img} />
          <h3 className={style.title}>{name[0].toUpperCase() + name.slice(1)}</h3>
          {genres?.map((genre) => (
          <p className={style.types} key={genre}>
            {genre[0].toUpperCase() + genre.slice(1)}
          </p>
        ))}          
        </Link>
        <div className={style.rating}>
        <div className={style.ratingText}>{rating}</div>
        </div>
      </div>
      );
};
export default Videogame;
