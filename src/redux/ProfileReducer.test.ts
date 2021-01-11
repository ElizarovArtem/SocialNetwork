import ProfileReducer, {
    AddPostActionCreator,
    InitialStateType,
    ProfileType,
    setStatusAC,
    setUserProfileAC
} from "./ProfileReducer";


test("post should be added", () => {
    let initialState: InitialStateType = {
        posts: [
            {id: 1, message: "Hello everybody", likesCount: 23},
            {id: 2, message: "Who want's to go for a walk?", likesCount: 12},
            {id: 2, message: "Go alone", likesCount: 12},
        ],
        profile: null,
        status:""
    }

    const newMessage = "Hello man"

    const action = AddPostActionCreator(newMessage)

    const endState = ProfileReducer(initialState, action)

    expect(endState.posts[3].message).toBe(newMessage)
    expect(endState.posts.length).toBe(4)

})

test("new status should be added", () => {
    let initialState: InitialStateType = {
        posts: [
            {id: 1, message: "Hello everybody", likesCount: 23},
            {id: 2, message: "Who want's to go for a walk?", likesCount: 12},
            {id: 2, message: "Go alone", likesCount: 12},
        ],
        profile: null,
        status: ""
    }

    const action = setStatusAC("Muscle")

    const endState = ProfileReducer(initialState, action)

    expect(endState.status).toBe("Muscle")
})

test("new profile should be added", () => {
    let initialState: InitialStateType = {
        posts: [
            {id: 1, message: "Hello everybody", likesCount: 23},
            {id: 2, message: "Who want's to go for a walk?", likesCount: 12},
            {id: 2, message: "Go alone", likesCount: 12},
        ],
        profile: null,
        status: ""
    }

    const newProfile: ProfileType = {
        aboutMe: "Madre santa",
        userId: 1,
        lookingForAJob: true,
        lookingForAJobDescription:"string",
        fullName: "Adam",
        contacts: {
            github: "",
            vk: "",
            facebook: "",
            twitter: "",
            website: "",
            youtube: "",
            mainLink: "",
        },
        photos: {
            small: (""), large: ("")
        }
    }

    const action = setUserProfileAC(newProfile)

    const endState = ProfileReducer(initialState, action)

    expect(endState.profile?.fullName).toBe("Adam")
})