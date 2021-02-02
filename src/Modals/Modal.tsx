import React from "react";
import s from './Modal.module.css'


type ModalPropsType = {
    title: string
    width: number
    height: number
    backgroundDiv: boolean
    bgOnClick: () => void
    CSSStyles?:  React.CSSProperties
}
export const Modal: React.FC<ModalPropsType> = (props) => {

    const modalStyles = {
        top: `calc(50vh - ${props.height / 2}px)`,
        left: `calc(50vw - ${props.width / 2}px)`,
        width: props.width,
        height: props.height,
        ...props.CSSStyles
    } as const

    return (
        <>
            {props.backgroundDiv && <div onClick={props.bgOnClick} className={s.backgroundDiv}></div>}
            <div className={s.modalWindow} style={modalStyles}>
                <h3>{props.title}</h3>
                <div className={s.buttonsStyle}>{props.children}</div>
            </div>
        </>
    )
}