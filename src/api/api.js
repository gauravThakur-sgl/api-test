import axios from 'axios'
export const fetchUserData = async () => {
    try {
        const res = await axios.get("https://reqres.in/api/users");
        console.log(res.data.data)
        return res.data
    } catch (error) {
        console.log("error", error)
    }
}



export const addUserData = async (userData) => {
    try {
        const res = await axios.post(`https://reqres.in/api/users/`, userData);
        console.log(res.data.data)
        return res.data;
    } catch (error) {
        console.log("error", error)
    }
}

export const EditUserData = async (userId,userData) => {
    try {
        const res = await axios.put(`https://reqres.in/api/users/${userId}`, userData);
        console.log(res.data.data)
        return res.data;
    } catch (error) {
        console.log("error", error)
    }
}

export const deleteUserData = async (userId) => {
    try {
        const res = await axios.delete(`https://reqres.in/api/users/${userId}`);
        console.log(res.data.data)
        return userId;
    } catch (error) {
        console.log("error", error)
    }
}
