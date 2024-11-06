
const initialState = {
    users: [],
    changeId: null,
    useData: {
        first_name: "",
        last_name: "",
        email: ""
    }
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_USERS":
            return {
                ...state,
                users: action.payload
            }
        case "DELETE_USERS":
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload)
            }
        case "ADD_USERS":
            return {
                ...state,
                changeId: Date.now(),
                users: [...state.users, action.payload]
            }
        case "UPDATE_USERS":
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? action.payload : user),
                changeId: null
            }
        case "ADD_EDITING":
            return {
                ...state,
                changeId: action.payload
            }
        default:
            return state
    }
};
export default userReducer;