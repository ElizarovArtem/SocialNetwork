import {ContactsType, ProfileType} from "../../../redux/ProfileReducer";
import s from "./ProfileInfo.module.css";
import React from "react";
import {Contact} from "./ProfileInfo";
import {createField, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../../utils/validators/validators";

type PropsType = {
    profile:  ProfileType
}
export type FormDataType = {
    userId?: number
    fullName?: string
    aboutMe?: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    contacts?: ContactsType
}
export const ProfileDataForm = (props: InjectedFormProps<FormDataType, PropsType> & PropsType) => {
    return <form onSubmit={props.handleSubmit}>
        <div><button>Save</button></div>
        {props.error && props.error}
        <div>
            <b>Name:</b>{createField("Enter new name",
            Input, [required], "fullName")}
        </div>
        <div>
            <b>About me:</b> {createField("Write about yourself",
            Textarea, [required], "aboutMe")}
        </div>
        <div>
            <b>Working status:</b>{createField("",
            Input, [], "lookingForAJob", {type: "checkbox"})}
        </div>
        <div>
            <b>My professional skills: </b>{createField("Write about your skills",
            Textarea, [required], "lookingForAJobDescription")}
        </div>
        <div>
            <b>Contacts:</b>
            <div className={s.contacts}>{Object.keys(props.profile.contacts).map(k => {
                return <div>
                    <b>{k}: </b>{createField("Enter link", Input, [], `contacts[${k}]`)}
                </div>
            })}</div>
        </div>
    </form>
}

const ProfileDataReduxForm = reduxForm<FormDataType, PropsType>({form: "profileData"})(ProfileDataForm)

export default ProfileDataReduxForm