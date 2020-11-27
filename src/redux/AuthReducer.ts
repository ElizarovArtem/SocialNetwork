const SET_USER_DATA = "SET_USER_DATA"

type InitialStateType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
const initialState: InitialStateType = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

type ActionsType = SetUserDataType

export const authReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type){
        case "SET_USER_DATA":
            return{
                ...state,
                ...action.data,
                isAuth: true
            }
        default:
            return state
    }
}

type SetUserDataType = {
    type: "SET_USER_DATA"
    data: {
        id: number
        email: string
        login: string
    }
}
export const setUserDataAC = (id: number, email: string, login: string): SetUserDataType => {
    return {
        type: SET_USER_DATA,
        data: {
            id,
            email,
            login
        }
    }
}