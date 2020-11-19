import UsersReducer, {
    changeCurrentPageAC,
    changeTotalUsersCountAC,
    followAC,
    InitialStateType,
    setUsersAC,
    unfollowAC
} from "./UsersReducer";

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
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1
    }

    const action = followAC(0)

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
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1
    }

    const action = unfollowAC(0)

    const endState = UsersReducer(initialState, action)

    expect(endState.users[0].followed).toBe(false)
})

test("users should be changed", () => {
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
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1
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

    const action = setUsersAC(newUsers)

    const endState = UsersReducer(initialState, action)

    expect(endState.users.length).toBe(2)
    expect(endState.users[1].id).toBe(2)
})

test("current page should be changed", () => {
    let initialState: InitialStateType = {
        users: [],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1
    }

    const newPage = 3
    const action = changeCurrentPageAC(newPage)

    const endState = UsersReducer(initialState, action)

    expect(endState.currentPage).toBe(3)
})

test("total users count should be changed", () => {
    let initialState: InitialStateType = {
        users: [],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1
    }

    const newUsersCount = 100
    const action = changeTotalUsersCountAC(newUsersCount)

    const endState = UsersReducer(initialState, action)

    expect(endState.totalUsersCount).toBe(100)
})