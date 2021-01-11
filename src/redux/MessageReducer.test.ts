import MessageReducer, {AddNewMessageAC, InitialStateType} from "./MessageReducer";

test("new message should be added", () => {
    let initialState: InitialStateType = {
        dialogs: [
            {id: "1", name: "Ilya"},
            {id: "2", name: "Andrey"},
            {id: "3", name: "Igor"},
        ],
        messages: [
            {id: 1, message: "Hello", owner: "first"},
            {id: 2, message: "Lets have a dinner together today", owner: "first"},
            {id: 3, message: "Lets go", owner: "second"},
            {id: 4, message: "Lets go", owner: "second"},
            {id: 5, message: "Lets go", owner: "first"},
        ]
    }

    const action = AddNewMessageAC("Bubblegum")

    const endState = MessageReducer(initialState, action)

    expect(endState.messages.length).toBe(6)
    expect(endState).toEqual( {
        dialogs: [
            {id: "1", name: "Ilya"},
            {id: "2", name: "Andrey"},
            {id: "3", name: "Igor"},
        ],
        messages: [
            {id: 1, message: "Hello", owner: "first"},
            {id: 2, message: "Lets have a dinner together today", owner: "first"},
            {id: 3, message: "Lets go", owner: "second"},
            {id: 4, message: "Lets go", owner: "second"},
            {id: 5, message: "Lets go", owner: "first"},
            {id: 6, message:"Bubblegum", owner: "first"}
        ]
    })
})