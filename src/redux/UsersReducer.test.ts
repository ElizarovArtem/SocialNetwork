import UsersReducer, {FollowAC, InitialStateType, SetUsersAC, UnfollowAC} from "./UsersReducer";

test("user should be followed", () => {
    let initialState: InitialStateType = {
        users: [
            {
                id: 0,
                photos: "",
                status: "aasf",
                name: "ASd",
                followed: false,
                location: {city:"Moscow", country:"Russia"}
            }
        ]
    }

    const action = FollowAC(0)

    const endState = UsersReducer(initialState, action)

    expect(endState.users[0].followed).toBe(true)
})

test("user should be unfollowed", () => {
    let initialState: InitialStateType = {
        users: [
            {
                id: 0,
                photos: "",
                status: "aasf",
                name: "ASd",
                followed: true,
                location: {city:"Moscow", country:"Russia"}
            }
        ]
    }

    const action = UnfollowAC(0)

    const endState = UsersReducer(initialState, action)

    expect(endState.users[0].followed).toBe(false)
})

test("users should be added", () => {
    let initialState: InitialStateType = {
        users: [
            {
                id: 0,
                photos: "",
                status: "aasf",
                name: "ASd",
                followed: true,
                location: {city:"Moscow", country:"Russia"}
            }
        ]
    }

    const newUsers = [
        {
            id: 1,
            photos: "",
            status: "Koka",
            name: "Vasya",
            followed: true,
            location: {city:"Moscow", country:"Russia"}
        },
        {
            id: 2,
            photos: "",
            status: "Loka",
            name: "Petya",
            followed: false,
            location: {city:"Moscow", country:"Russia"}
        }
    ]

    const action = SetUsersAC(newUsers)

    const endState = UsersReducer(initialState, action)

    expect(endState.users.length).toBe(3)
    expect(endState.users[1].id).toBe(1)
})