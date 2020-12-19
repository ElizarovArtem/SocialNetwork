import React from "react";
import {InjectedFormProps, Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authMeThunk, logInThunk} from "../../redux/AuthReducer";


type FormDataType = {
    login: string
    password: string
    rememberMe: boolean
}

export const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return(
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={"Login"} component={"input"} name={"login"}/>
                </div>
                <div>
                    <Field placeholder={"Password"} component={"input"} name={"password"}/>
                </div>
                <div>
                    <Field type={"checkbox"} component={"input"} name={"rememberMe"}/> remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}

export const LoginReduxForm = reduxForm<FormDataType>({ form: "login" })(LoginForm)

type LoginPropsType = MapDispatchToPropsType & MapStateToPropsType

export const Login = (props: LoginPropsType) => {
    const onSubmit = (formData: FormDataType) => {
        props.logInThunk(formData.login, formData.password, formData.rememberMe)
    }

    return(
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

type MapStateToPropsType = {

}
type MapDispatchToPropsType = {
    logInThunk: (email: string, password: string, rememberMe: boolean) => void
}

const MapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {

    }
}

export const LoginContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
(MapStateToProps,{logInThunk})
(Login)