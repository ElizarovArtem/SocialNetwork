import React from "react";
import {InjectedFormProps, Field, reduxForm} from "redux-form";

export const Login = () => {
    const onSubmit = (formData: FormDataType) => {
        console.log(formData)
    }
    return(
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

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