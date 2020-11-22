import ProfileReducer, {AddPostActionCreator, ChangeNewPostTextActionCreator, InitialStateType} from "./ProfileReducer";


test("post should be added", () => {
    let initialState: InitialStateType = {
        newPostText: "Best",
        posts: [
            {id: 1, message: "Hello everybody", likesCount: 23},
            {id: 2, message: "Who want's to go for a walk?", likesCount: 12},
            {id: 2, message: "Go alone", likesCount: 12},
        ],
        profile: null
    }

    const action = AddPostActionCreator()

    const endState = ProfileReducer(initialState, action)

    expect(endState.posts[3].message).toBe("Best")
    expect(endState.newPostText).toBe("")

})

test("new post-text should be added", () => {
    let initialState: InitialStateType = {
        newPostText: "Muscl",
        posts: [
            {id: 1, message: "Hello everybody", likesCount: 23},
            {id: 2, message: "Who want's to go for a walk?", likesCount: 12},
            {id: 2, message: "Go alone", likesCount: 12},
        ],
        profile: null
    }

    const action = ChangeNewPostTextActionCreator("Muscle")

    const endState = ProfileReducer(initialState, action)

    expect(endState.newPostText).toBe("Muscle")
})