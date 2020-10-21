import React from 'react';
import s from "./ProfileInfo.module.css";


export function ProfileInfo() {
    return (
        <div className={s.content}>
            <div>
                <img
                    src="https://mirgif.com/priroda/more41.jpg"
                    width="100%"/>
            </div>
            <div className={s.descriptionBlock}>
                Ava+Description
            </div>
        </div>
    );
}