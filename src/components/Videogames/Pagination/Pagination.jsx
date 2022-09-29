import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Pagination.module.css";
import { changePage } from '../../../redux/actions';

export default function Pagination({ videogames }) {
  const dispatch = useDispatch();
  const [input, setInput] = useState(1);
  let page  = useSelector(state=>state.currentPage);
  const videogamesForPage = useSelector(state => state.videogamesForPage);

  const totalPages = Math.ceil(videogames.length / videogamesForPage);
  useEffect(()=>{
    if (parseInt(input)!==page){
      setInput(1);
    }
  },[page]);

  const previous = (e) => {
    setInput(page - 1);
    dispatch(changePage(page - 1));
  };

  const next = (e) => {
    setInput(page + 1);
    dispatch(changePage(page + 1));
  };

  const enter = (e) => {
    if (e.keyCode === 13) {
      dispatch(changePage(parseInt(e.target.value)));
      if (
        Number(e.target.value < 1) ||
        parseInt(e.target.value) > totalPages ||
        isNaN(parseInt(e.target.value))
      ) {
        setInput(1);
        dispatch(changePage(1));
      }
    }
  };
  const handleChange = (e) => {
    setInput(e.target.value);
    if (input===page && (page===1) && (input!==1)) //control ingreso de input por teclado
       {setInput(1);dispatch(changePage(1));}
  };
  return (
    <div>
     <button className={s.pagination} onClick={previous} disabled={page <= 1}>
        Prev
      </button>
      <input
        onChange={handleChange}
        onKeyDown={enter}
        name="page"
        value={input}
        maxLength={2}
        autoComplete="off"
        className={s.input}
      />
      <span className={s.span}> de {totalPages}</span>
      <button
        className={s.pagination}
        onClick={next}
        disabled={page >= totalPages}>
        Next
      </button>
    </div>
  );
}
