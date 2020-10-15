import React from 'react';
import s from "./ProfileInfo.module.css";


export function ProfileInfo() {
    return (
        <div className={s.content}>
            <div>
                <img
                    src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                    width="100%"/>
            </div>
            <div className={s.descriptionBlock}>
                Ava+Description
            </div>
        </div>
    );
}