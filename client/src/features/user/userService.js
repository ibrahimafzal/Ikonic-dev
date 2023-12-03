import { toast } from "react-toastify"
import axios from "../../utils/axios"
import { Navigate } from "react-router-dom"

// const getTokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null

// const config = {
//     headers: {
//         Authorization: `Bearer ${getTokenFromLocalStorage?.token}`,
//         Accept: "Application/json"
//     }
// }

// REGISTER
const register = async (userData) => {
    const res = await axios.post("user/register", userData)
    if (res?.data) {
        localStorage.setItem("user", JSON.stringify(res.data))
    }
    return res?.data
}


// LOGIN
const login = async (userData) => {
    const res = await axios.post("user/login", userData)
    if (res?.data) {
        localStorage.setItem("user", JSON.stringify(res.data))
    }
    return res?.data
}

const getAllUsers = async () => {
    const res = await axios.get("user/all-users")
    if (res?.data) {
        return res?.data
    }
}

const deleteUser = async (id) => {
    const res = await axios.delete(`user/delete/${id}`)
    if (res?.data) {
        return res?.data
    }
}

const updateUser = async (user) => {
    const res = await axios.put(`user/update/${user.id}`, { role: user?.role })
    if (res?.data) {
        return res?.data
    }
}


const userService = {
    register,
    login,
    getAllUsers,
    deleteUser,
    updateUser
}

export default userService