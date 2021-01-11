import {appReducer, InitialStateType, setAppInitializedAC} from "./AppReducer";


test("app should be initialized", () => {
    let initialState: InitialStateType = {
        initialized: false
    }

    const action = setAppInitializedAC()

    const endState = appReducer(initialState, action)

    expect(endState.initialized).toBeTruthy()
})