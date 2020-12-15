import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./My posts/MyPostsContainer";
import {ProfileType} from "../../redux/ProfileReducer";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatusThunk: (status: string) => void
}

export function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatusThunk={props.updateStatusThunk}/>
            <MyPostsContainer/>
        </div>
    );
}