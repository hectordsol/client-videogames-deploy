import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getVideogameDetail, clearDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "../Navbar/Navbar";
import style from "./VideogameDetail.module.css";

export default function VideogameDetail() {
  const { id } = useParams();
  let {name, description, released, rating, platforms, genres, image} = useSelector((state) => state.videogameDetail);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideogameDetail(id));
    return () => {
      dispatch(clearDetail());
    };
  }, [id, dispatch]);
  // const getDetails = ()=>{
  //   details?{ image, title, dishTypes, diets, summary, healthScore, instructions } = details:details=null;    
  // }
  // const history = useHistory();
  return (
     <div>
       <NavBar/>
      <div className={style.content}>
          <div className={style.ratings}>
              <span id="rating">
                Rating:{" "}
                <progress
                  id="rating"
                  max="5.0"
                  value={rating}
                  className={style.rating}
                />{" "}
                {rating}
              </span>
          </div>
          {/**score */}
        <h3 className={style.title}>{name}</h3>
        <img
          src={image}
          alt="Img Not Available"
          width="500px"
          className={style.img}
        />
        <div className={style.description}>
          <span className={style.subtitle}>
            Description:
          </span>
          <p>{description && description.replace(/<[^>]+>/g, "")}</p>
        </div>{/**description */}

        <div className={style.subtitle}>
        Genres:
        </div>
        <div className={style.genres}>
            {genres?.map((genre) => (
              <p key={genre} className={style.types}>{genre}</p>
            ))}
        </div>
        {/**genres  */}

        <div className={style.subtitle}>
            Platforms:
        </div>
        <div className={style.genres}>
            {platforms?.map((platform) => (
              <p key={platform} className={style.types}>{platform}</p>
            ))}
        </div>
        {/**platforms */}
      </div>

    </div>
  );
}
