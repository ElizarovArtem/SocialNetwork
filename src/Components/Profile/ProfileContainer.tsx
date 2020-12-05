import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {ProfileType, setUSerProfileAC, setUserProfileThunk} from "../../redux/ProfileReducer";
import {AppStateType} from "../../redux/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";


type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToProps
type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.match.params.userId
        if(!userId){
            userId = "12410"
        }
       this.props.setUserProfileThunk(userId)
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

const ContainerComponentWithURL = withRouter(ProfileContainer)

type MapStateToPropsType = {
    profile: ProfileType | null
}
type MapDispatchToProps = {
    setUSerProfileAC: (profile: ProfileType) => void
    setUserProfileThunk: (userId: string) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile
    }
}
export const ProfileBigContainer =
    connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>
    (mapStateToProps, {setUSerProfileAC, setUserProfileThunk})(ContainerComponentWithURL)