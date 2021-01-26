import React, {ChangeEvent, useState} from 'react';
import s from "./ProfileInfo.module.css";
import {ContactsType, ProfileType} from "../../../redux/ProfileReducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {Status} from "./Status/Status";
import userPhoto from '../../../assets/images/user-profile.png'
import {StatusWithUseState} from "./Status/StatusWithUseState";
import ProfileDataForm, {FormDataType} from './ProfileDataForm';

type ProfileInfoPropsType = {
    updatePhotoThunk: (photoFile: File) => void
    profile: ProfileType | null
    status: string
    updateStatusThunk: (status: string) => void
    updateProfileThunk: (profileData: FormDataType) => void
    isOwner: boolean
}

export function ProfileInfo(props: ProfileInfoPropsType) {
    let [isEditMode, setIsEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader/>
    }

    const onSendPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target && e.target.files && e.target.files[0]
        if (file !== null) {
            props.updatePhotoThunk(file)
        }
    }

    const onSubmit = (data: FormDataType) => {
        const promise = props.updateProfileThunk(data)
        Promise.all([promise]).then(() => {
            setIsEditMode(false)
        })
    }

    return (
        <div className={s.content}>
            <div>
                <img
                    src="https://mirgif.com/priroda/more41.jpg"
                    width="100%"/>
            </div>
            <div className={s.descriptionBlock}>
                <div>
                    <img src={props.profile.photos.large || userPhoto}/>
                    {props.isOwner && <input type="file" onChange={onSendPhoto}/>}
                </div>
                <StatusWithUseState status={props.status} updateStatusThunk={props.updateStatusThunk}/>
                {isEditMode ?
                    <ProfileDataForm initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}/>
                    :
                    <ProfileData isOwner={props.isOwner} onEdit={() => setIsEditMode(true)} profile={props.profile}/>}
            </div>
        </div>
    );
}

type ProfileDataPropsType = {
    profile: ProfileType
    onEdit: (() => void)
    isOwner: boolean
}
const ProfileData = (props: ProfileDataPropsType) => {
    return <div>
        <div>
            {props.isOwner && <button onClick={props.onEdit}>Edit</button>}
        </div>
        <div><b>Name:</b> {props.profile.fullName}</div>
        <div><b>About me:</b> {props.profile.aboutMe}</div>
        <div><b>Working status:</b> {props.profile.lookingForAJob ? "Ready for new offers" : "Working"}</div>
        <div><b>My professional skills: </b>{props.profile.lookingForAJobDescription}</div>
        <div><b>Contacts:</b>
            <div className={s.contacts}>{Object.keys(props.profile.contacts).map(k => {
                return <Contact
                    key={k}
                    contactName={k}
                    contactDescription={props.profile.contacts[k as keyof ContactsType]}
                />
            })}</div>
        </div>
    </div>
}

type ContactPropsType = {
    contactName: string
    contactDescription: string
}
export const Contact = (props: ContactPropsType) => {
    return (
        <div>
            <b>{props.contactName}: </b><span>{props.contactDescription}</span>
        </div>
    )
}