import React, { useState,useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import NavBar  from '../Navbar/Navbar';
import Videogames from '../Videogames/Videogames';
import style from'./Home.module.css';

import { 
  searchVideogames,
  getGenres,
  sortBy, 
  sortType, 
  showStore,
  changePage,
  loadingVideogames,
  filterByGenres } from '../../redux/actions';

function Home () {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  let genres = useSelector((state) => state.genres);

  function onSubmit(e){ // Envía el estado para searchVideogames.
    e.preventDefault();
    if(search){//solo si search no está vacío
      dispatch(loadingVideogames(true));
      dispatch(searchVideogames(search));
      setSearch("");
      document.getElementById('option').selected='selected';//selecciono la opcion sin ordenar
      hideType();//oculto filtro asc y des
      dispatch(changePage(1));
    }// con else, si search esta vacío, puedo mandar un mensaje de alerta si quiero
  }  
  function onChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  function handleBy(e) {
    e.preventDefault();
    if (e.target.value==="unsorted") hideType();// si selecciono la opcion sin ordenar
    else showType();//si elijo alguna de las opciones Order By
    dispatch(sortBy(e.target.value));//ejecuto las acciones sortBy y changePage a 1
    dispatch(changePage(1));
};
function handleStore(e) {
  e.preventDefault();
  dispatch(showStore(e.target.value));//ejecuto las acciones showStore (all o api o db) y changePage a 1
  dispatch(changePage(1));
};

function showType() {
  document.getElementById('type').style.display = 'flex';
  document.getElementById('labelType').style.display = 'flex';
}
function hideType() {
  document.getElementById('type').style.display = 'none';
  document.getElementById('labelType').style.display = 'none';
}
function handleType(e){
    e.preventDefault();
    dispatch(sortType(e.target.value));//ejecuto las acciones sortType (Asc o Des) y changePage a 1
    dispatch(changePage(1));
};
const filterGenres = (e) => {
  e.preventDefault();
  dispatch(filterByGenres(e.target.value));
  dispatch(changePage(1));
};
useEffect(() => {
  dispatch(loadingVideogames(true));
  dispatch(searchVideogames(search));
  dispatch(getGenres());
}, [dispatch]);

    return (
    <div className={style.container}>
       <NavBar className={style.nav}/>
       <div className={style.searchContainer}>
            
            <div className={style.titleContainer}>
                  <div className={style.nada}></div>
                  <div className={style.title} data-text="Henry Videogames">Henry Videogames</div>
                  <NavLink className={style.iconCreate} to="/create" >
                    
                    <label className={style.labelCreate}> Create Videogame</label>
                  </NavLink>
            </div>
              <form className={style.formSubmit} onSubmit={onSubmit}> 
                <input autoComplete="off"
                      placeholder="Search videogame by name" 
                      type='text'
                      className={style.inputSearch}
                      onChange={onChange}
                      value={search}/>
                <button type="submit" className={style.buttonSearch}>Search</button>  
              </form>
                <div className={style.selectOptions}> 
                <label className={style.labelBy}>Storage:</label>
                    <select id='store' className={style.by} onChange={(e)=>handleStore(e)}>
                        <option id='option' value='all'>ALL</option>
                        <option value='api'>API</option>
                        <option value='db'>DB</option>
                    </select> {/* filter Store */} 
                    
                    <label className={style.labelBy}> Order By: </label>
                    <select id='by' className={style.by} onChange={(e)=>handleBy(e)}>
                        <option id='option' value='unsorted'>unsorted</option>
                        <option value='name'>Name</option>
                        <option value='rating'>Score</option>
                    </select> {/* Order Options */}

                    <label id='labelType' className={style.labelType}> Order Type: </label>
                    <select id="type" className={style.type} onChange={(e)=> handleType(e)}>
                        <option value="asc">Asc</option>
                        <option value="des">Des</option>
                    </select>{/* filter Order Type */}
                     
                    <div className={style.filter}>
                        <div className={style.formFilters}>
                            <select onChange={filterGenres} className={style.selectFilter}>
                            <option value="none"> Without filter</option>
                            {genres?.map((g) => (
                              <option key={g.name} value={g.name}>
                                {" "}
                                {g.name[0].toUpperCase() + g.name.slice(1)}
                              </option>
                            ))}
                            </select>
                        </div>
                      </div>{/* filter genres */}      
                  </div>{/* selects */}

          </div>{/* search Container*/}
          <div className={style.videogames}>
            <Videogames/>
          </div> {/* videogames */}
      </div>
    );
  }
export default Home;
