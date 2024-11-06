import axios from 'axios'
export const fetchUserData = async () => {
    try {
        const res = await axios.get("/");
        console.log(res.data.data)
        return res.data
    } catch (error) {
        console.log("error", error)
    }
}



export const addUserData = async (userData) => {
    try {
        const res = await axios.post(`/`, userData);
        console.log(res.data.data)
        return res.data;
    } catch (error) {
        console.log("error", error)
    }
}

export const EditUserData = async (userId,userData) => {
    try {
        const res = await axios.put(`/${userId}`, userData);
        console.log(res.data.data)
        return res.data;
    } catch (error) {
        console.log("error", error)
    }
}

export const deleteUserData = async (userId) => {
    try {
        const res = await axios.delete(`/${userId}`);
        console.log(res.data.data)
        return userId;
    } catch (error) {
        console.log("error", error)
    }
}
