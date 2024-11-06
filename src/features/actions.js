export const FETCH_USERS = 'FETCH_USERS';
export const DELETE_USERS = 'DELETE_USERS';
export const ADD_USERS = 'ADD_USERS';
export const ADD_EDITING = 'ADD_EDITING';
export const UPDATE_USERS = 'UPDATE_USERS';
export const fetchUsers = (users) => (
    {
        type: FETCH_USERS,
        payload: users
    }
)

export const addUser = (user) => (
    {
        type: ADD_USERS,
        payload: user
    }
)
export const updateUser = (user) => (
    { type: UPDATE_USERS, payload: user }
)
export const setChange = (userId) => (
    {
        type: ADD_EDITING,
        payload: userId
    }
)
export const deleteUsers = (userId) => (
    {
        type: DELETE_USERS,
        payload: userId
    }
)
