import React from "react";
import {InjectedFormProps, Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logInThunk} from "../../redux/AuthReducer";
import {Input} from "../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {Redirect} from "react-router-dom";
import s from "./../common/FormsControls/FormsControls.module.css"


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

const maxLength20 = maxLengthCreator(35)

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return(
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={"Login"} component={Input} validate={[required, maxLength20]} name={"login"}/>
                </div>
                <div>
                    <Field placeholder={"Password"} component={Input} validate={[required, maxLength20]} name={"password"}/>
                </div>
                <div>
                    <Field type={"checkbox"} component={"input"} name={"rememberMe"}/> remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
                {
                    props.error && <div className={s.validationErrorMessage}>{props.error}</div>
                }
            </form>
    )
}

export const LoginReduxForm = reduxForm<FormDataType>({ form: "login" })(LoginForm)

type LoginPropsType = MapDispatchToPropsType & MapStateToPropsType

export const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.logInThunk(formData.login, formData.password, formData.rememberMe)
    }

   if(props.isAuth) return <Redirect to={"/profile"}/>

    return(
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

type MapStateToPropsType = {
    isAuth: boolean
}
type MapDispatchToPropsType = {
    logInThunk: (email: string, password: string, rememberMe: boolean) => void
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const LoginContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(MapStateToProps,{logInThunk})
(Login)