import {ActionTypes} from "./state";

export type UserType = {
    id: number
    avatarURL: string
    followed: boolean
    fullName: string
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

type InitialStateType = {
    users: Array<UserType>
}

const UsersReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
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

const FollowAC = (ID: number) => {
    return {
        type: FOLLOW,
        userID: ID
    } as const
};
const UnfollowAC = (ID: number) => {
    return {
        type: UNFOLLOW,
        userID: ID
    } as const
};
const SetUsersAC = (users: Array<UserType>) => {
    return {
        type: SET_USERS,
        user: users
    } as const
};

export default UsersReducer;