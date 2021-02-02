import {authReducer, InitialStateType, setUserDataAC} from "./AuthReducer";


test("user should be authorized", () => {
    let initialState: InitialStateType = {
        id: null,
        email: null,
        login: null,
        isAuth: false,
        captcha: null
    }

    const action = setUserDataAC(11,"karabah", "gangubas", true)

    const endState = authReducer(initialState, action)

    expect(endState.id).toBe(11)
    expect(endState.email).toBe("karabah")
})