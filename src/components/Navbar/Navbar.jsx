import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoLanding from '../../logo-videogame.png';
import LogoHome from '../../Images/Home-logo.png';
import style from "./Navbar.module.css"



export default function Navbar() {
    return (
        <header className={style.navbar}>
            <div className={style.landing}> 
                <NavLink to="/" >
                <img id={style.logo} src={LogoLanding} width="30" height="30" alt="" />
                </NavLink>
            </div>
            <div className={style.home}>
                <NavLink to="/home" >
                <img id={style.logo} src={LogoHome} width="30" height="30" alt="" />
                </NavLink>            
            </div>
        </header>
    )
}