import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./My posts/MyPostsContainer";
import {ProfileType} from "../../redux/ProfileReducer";
import {FormDataType} from "./ProfileInfo/ProfileDataForm";

type ProfilePropsType = {
    profile: ProfileType | null
    status: string
    updateStatusThunk: (status: string) => void
    isOwner: boolean
    updatePhotoThunk: (photoFile: File ) => void
    updateProfileThunk: (profileData: FormDataType) => void
    error: string | null
}

export function Profile(props: ProfilePropsType) {
    return (
        <div>
            <ProfileInfo
                error={props.error}
                updatePhotoThunk={props.updatePhotoThunk}
                updateProfileThunk={props.updateProfileThunk}
                isOwner={props.isOwner}
                profile={props.profile}
                status={props.status}
                updateStatusThunk={props.updateStatusThunk}
            />
            <MyPostsContainer/>
        </div>
    );
}