import React from "react";
import {Field, WrappedFieldProps} from "redux-form";
import s from "./FormsControls.module.css"


export const FormControl: React.FC<WrappedFieldProps> = ({input,meta, children, ...restProps}) => {

    const isError = meta.touched && meta.error

    return(
        <div className={isError ? s.error : ""}>
            <div>
                {children}
            </div>
            <div className={s.error}>
                {isError && <span>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {meta,input,...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps}></textarea></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {meta,input,...restProps} = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>
}

export const createField = (placeholder: string,
                            component: React.FC<WrappedFieldProps> | string,
                            validators: Array<Function>,
                            name: string,
                            props: Object = {},
                            text: string = ""
                            ) => {
    return <div>
        <Field placeholder={placeholder} component={component} validate={validators} name={name} {...props}/> {text}
    </div>
}