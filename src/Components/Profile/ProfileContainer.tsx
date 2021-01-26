import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {
    ProfileType,
    setStatusThunk,
    setUserProfileThunk, updatePhotoThunk, updateProfileThunk,
    updateStatusThunk
} from "../../redux/ProfileReducer";
import {AppStateType} from "../../redux/redux-store";
import {withRouter} from "react-router-dom";
import {RouteComponentProps} from "react-router";
import {WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";
import {FormDataType} from "./ProfileInfo/ProfileDataForm";


type ProfileContainerPropsType = MapStateToPropsType & MapDispatchToProps
type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType

class ProfileContainer extends React.Component<PropsType> {

    openCorrectUserProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = String(this.props.authorizedUserId)
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.setUserProfileThunk(userId)
        this.props.setStatusThunk(userId)
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.openCorrectUserProfile()
        }
    }

    componentDidMount() {
        this.openCorrectUserProfile()
    }

    render() {
        return (
            <Profile
                isOwner={!this.props.match.params.userId}
                updateProfileThunk={this.props.updateProfileThunk}
                profile={this.props.profile}
                status={this.props.status}
                updateStatusThunk={this.props.updateStatusThunk}
                updatePhotoThunk={this.props.updatePhotoThunk}
            />
        )
    }
}

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
}
type MapDispatchToProps = {
    setUserProfileThunk: (userId: string) => void
    setStatusThunk: (userId: string) => void
    updateStatusThunk: (status: string) => void
    updatePhotoThunk: (photoFile: File) => void
    updateProfileThunk: (profileData: FormDataType) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id
    }
}
export const ProfileBigContainer = compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToProps, {}, AppStateType>
    (mapStateToProps,
        {
            updateProfileThunk,
            setUserProfileThunk,
            setStatusThunk,
            updateStatusThunk,
            updatePhotoThunk
        }),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)
