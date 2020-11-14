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

export type FollowACType = ReturnType<typeof FollowAC>
export type UnfollowACType = ReturnType<typeof UnfollowAC>
export type SetUsersACType = ReturnType<typeof SetUsersAC>

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"

let initialState: InitialStateType = {
    users: []
}

export type InitialStateType = {
    users: Array<UserType>
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
            return { ...state, users: [ ...state.users, ...action.user] }
    }
    return state;
}

export const FollowAC = (ID: number) => {
    return {
        type: FOLLOW,
        userID: ID
    } as const
};
export const UnfollowAC = (ID: number) => {
    return {
        type: UNFOLLOW,
        userID: ID
    } as const
};
export const SetUsersAC = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        user: users
    } as const
};

export default UsersReducer;