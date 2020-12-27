import React from 'react';
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../redux/ProfileReducer";
import {Preloader} from "../../common/Preloader/Preloader";
import {Status} from "./Status/Status";
import userPhoto from '../../../assets/images/user-profile.png'

type ProfileInfoPropsType = {
    profile: ProfileType | null
    status: string
    updateStatusThunk: (status: string) => void
}
export function ProfileInfo(props: ProfileInfoPropsType) {
    if(!props.profile){
        return <Preloader/>
    }

    let keys = Object.keys(props.profile.contacts)

    return (
        <div className={s.content}>
            <div>
                <img
                    src="https://mirgif.com/priroda/more41.jpg"
                    width="100%"/>
            </div>
            <div className={s.descriptionBlock}>
                <div>
                    <img src={props.profile.photos.large ? props.profile.photos.large : userPhoto }/>
                </div>
                <div>Name: {props.profile.fullName}</div>
                <Status status={props.status} updateStatusThunk={props.updateStatusThunk}/>
                <div>Working status: {props.profile.lookingForAJob ? "Ready for new offers" : "Working"}</div>
                <div>Contacts: {keys.map(k => {
                    return <li>{k}</li>
                })}</div>

            </div>
        </div>
    );
}