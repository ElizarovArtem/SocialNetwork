import {ActionTypes} from "./state";

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

let initialState: InitialStateType = {
    users: [],
    pageSize: 100,
    totalUsersCount: 0,
    currentPage: 1
}

export type InitialStateType = {
    users: Array<UserType>
    totalUsersCount: number
    pageSize: number
    currentPage: number
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

export default UsersReducer;