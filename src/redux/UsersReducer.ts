import {ActionTypes, AppStateType} from "./redux-store";
import {usersAPI} from "../api/api";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

export type UserType = {
    id: number
    photos: any
    followed: boolean
    name: string
    status: string
    location: LocationType
}
type LocationType = {
    country: string
    city: string
}

export type FollowACType = ReturnType<typeof followAC>
export type UnfollowACType = ReturnType<typeof unfollowAC>
export type SetUsersACType = ReturnType<typeof setUsersAC>

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const CHANGE_CURRENT_PAGE = "CHANGE-CURRENT-PAGE"
const CHANGE_TOTAL_USERS_COUNT = "CHANGE-TOTAL-USERS-COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE-IS-FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

let initialState: InitialStateType = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    toggleFollowingProgress: false,
    followingUsers: []
}

export type InitialStateType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
    toggleFollowingProgress: boolean
    followingUsers: number[]
}

export const UsersReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type){
        case FOLLOW:
           return  {
               ...state,
               users: state.users.map(u => {
                   if(u.id === action.userID){
                       return { ...u, followed: true }
                   }
                   return u;
               })
           }
        case UNFOLLOW:
            return  {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userID){
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {  ...state, users: action.users }
        case CHANGE_CURRENT_PAGE:
            return { ...state, currentPage: action.newPage }
        case "CHANGE-TOTAL-USERS-COUNT":
            return { ...state, totalUsersCount: action.newUsersCount}
        case "TOGGLE-IS-FETCHING":
            return { ...state, isFetching: action.isFetching }
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return { ...state,
                toggleFollowingProgress: action.isFollowing,
                followingUsers: action.isFollowing
                    ? [...state.followingUsers, action.uId]
                    : state.followingUsers.filter(n => n !== action.uId) }
        default:
            return state
    }
}

export const followAC = (ID: number) => {
    return {
        type: FOLLOW,
        userID: ID
    } as const
};
export const unfollowAC = (ID: number) => {
    return {
        type: UNFOLLOW,
        userID: ID
    } as const
};
export const setUsersAC = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        users: users
    } as const
};
export type ChangeCurrentPageType = {
    type: "CHANGE-CURRENT-PAGE"
    newPage: number
}
export const changeCurrentPageAC = (newPage: number): ChangeCurrentPageType => {
    return {
        type: CHANGE_CURRENT_PAGE,
        newPage
    }
};
export type ChangeTotalUsersCountType = {
    type: "CHANGE-TOTAL-USERS-COUNT"
    newUsersCount: number
}
export const changeTotalUsersCountAC = (newUsersCount: number): ChangeTotalUsersCountType => {
    return {
        type: CHANGE_TOTAL_USERS_COUNT,
        newUsersCount
    }
};
export type ToggleIsFetchingType = {
    type: "TOGGLE-IS-FETCHING"
    isFetching: boolean
}
export const toggleIsFetchingAC = (isFetching: boolean): ToggleIsFetchingType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
};
export type ToggleFollowingProgressType = {
    type: "TOGGLE_IS_FOLLOWING_PROGRESS"
    isFollowing: boolean
    uId: number
}
export const toggleFollowingProgressAC = (isFollowing: boolean, uId: number): ToggleFollowingProgressType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFollowing,
        uId
    }
};


export type GetUsersThunkType = ThunkAction<void, AppStateType, { currentPage: number, pageSize: number } , ActionTypes>
export const getUsersThunk = (currentPage: number , pageSize: number):GetUsersThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: ()=> AppStateType) => {
        dispatch(toggleIsFetchingAC(true))
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetchingAC(false))
            dispatch(setUsersAC(data.items))
            dispatch(changeTotalUsersCountAC(data.totalCount))
        })
    }
}
export type ChangePageThunkType = ThunkAction<void, AppStateType, { newPage: number, pageSize: number } , ActionTypes>
export const changePageThunk = (newPage: number, pageSize: number): ChangePageThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: ()=> AppStateType) => {
        dispatch(toggleIsFetchingAC(true))
        dispatch(changeCurrentPageAC(newPage))
        usersAPI.getUsers(newPage, pageSize).then(data => {
            dispatch(toggleIsFetchingAC(false))
            dispatch(setUsersAC(data.items))
        })
    }
}
export type UnfollowThunkType = ThunkAction<void, AppStateType, { id: number } , ActionTypes>
export const unfollowThunk = (id: number): UnfollowThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: ()=> AppStateType) => {
        dispatch(toggleFollowingProgressAC(true, id))
        usersAPI.unfollow(id).then(data => {
            if (data.resultCode == 0) {
                dispatch(unfollowAC(id))
            }
            dispatch(toggleFollowingProgressAC(false, id))
        })
    }
}
export type FollowThunkType = ThunkAction<void, AppStateType, { id: number } , ActionTypes>
export const followThunk = (id: number): FollowThunkType => {
    return (dispatch: ThunkDispatch<AppStateType, unknown, ActionTypes>, getState: ()=> AppStateType) => {
        dispatch(toggleFollowingProgressAC(true, id))
        usersAPI.follow(id).then(data => {
            if (data.resultCode == 0) {
                dispatch(followAC(id))
            }
            dispatch(toggleFollowingProgressAC(false, id))
        })
    }
}

export default UsersReducer;