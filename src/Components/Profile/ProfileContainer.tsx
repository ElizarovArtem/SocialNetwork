import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import { ProfileType, setUSerProfileAC} from "../../redux/ProfileReducer";
import axios from "axios";
import {AppStateType} from "../../redux/redux-store";

type ProfileContainerPropsType = {
    profile: ProfileType | null
    setUSerProfileAC: (profile: ProfileType) => void
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUSerProfileAC(response.data)
            })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

type MapStateToPropsType = {
    profile: ProfileType | null
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}
type MapDispatchToProps = {
    setUSerProfileAC: (profile: ProfileType) => void
}
export const ProfileBigContainer = connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {setUSerProfileAC})(ProfileContainer)