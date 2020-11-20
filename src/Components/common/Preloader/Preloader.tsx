import s from "../../Users/users.module.css";
import React from "react";
import PreloaderForPAge from "../../../assets/images/preloader.gif"


export const Preloader = () => {
    return <div >
        <img className={s.preloader} src={PreloaderForPAge}/>
    </div>
}