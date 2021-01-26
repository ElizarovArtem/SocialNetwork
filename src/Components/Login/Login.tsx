import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logInThunk} from "../../redux/AuthReducer";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import s from "./../common/FormsControls/FormsControls.module.css"


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
    captcha: string
}

const maxLength20 = maxLengthCreator(35)

export const LoginForm: React.FC<InjectedFormProps<FormDataType, { captcha: string | null }> & { captcha: string | null }>
    = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField("Login", Input, [required, maxLength20], 'login')}
            {createField("Password", Input, [required, maxLength20],
                'password', {type: "password"})}
            {createField("", "input", [], 'rememberMe',
                {type: "checkbox"}, "Remember Me")}
            {props.captcha && <img src={props.captcha}/>}
            {props.captcha && createField("Enter symbols", Input, [required], 'captcha')}
            <div>
                <button>Login</button>
            </div>
            {
                props.error && <div className={s.validationErrorMessage}>{props.error}</div>
            }
        </form>
    )
}

export const LoginReduxForm = reduxForm<FormDataType, { captcha: string | null }>({form: "login"})(LoginForm)

type LoginPropsType = MapDispatchToPropsType & MapStateToPropsType

export const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.logInThunk(formData.login, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) return <Redirect to={"/profile"}/>

    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
        </div>
    )
}

type MapStateToPropsType = {
    isAuth: boolean
    captcha: string | null
}
type MapDispatchToPropsType = {
    logInThunk: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

export const LoginContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(MapStateToProps, {logInThunk})
(Login)