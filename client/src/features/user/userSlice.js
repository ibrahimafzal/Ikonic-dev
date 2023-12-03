import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import userService from "./userService"


const getUserFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const initialState = {
    user: getUserFromLocalStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
}

// Register User
export const registerUser = createAsyncThunk("auth/register", async (user) => {
    try {
        const res = await userService.register(user)
        return res?.data
    } catch (error) {
        console.log(error)
        toast.error(error)
    }
})

// login User
export const loginUser = createAsyncThunk("auth/login", async (user) => {
    try {
        const res = await userService.login(user)
        return res
    } catch (error) {
        toast.error(error)
        console.log(error)
    }
})

export const getUsers = createAsyncThunk("auth/get-all-users", async () => {
    try {
        const res = await userService.getAllUsers()
        return res
    } catch (error) {
        toast.error(error)
        console.log(error)
    }
})

export const deleteAUser = createAsyncThunk("auth/delete-user", async(id) => {
    try {
    const res = await userService.deleteUser(id)
    return res
    } catch (error) {
        toast.error(error)
        console.log(error)
    }
})

export const updateAUser = createAsyncThunk("auth/update-user", async(userData, thunkApi) => {
    try {
    const res = await userService.updateUser(userData)
    return res
    } catch (error) {
        toast.error(error)
        console.log(error)
    }
})

export const resetState = createAction("Reset_All")


export const userSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.message = "Pending"
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false
                state.message = "Fullfilled"
                state.createdUser = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = "Rejected"
                state.message = action.error
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
                state.message = "Pending"
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = "Fullfilled"
                state.user = action?.payload
                if (state?.isSuccess === true) {
                    localStorage.setItem("token", action?.payload?.token)
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
                state.message = "Pending"
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = "Fullfilled"
                state.allUsers = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(deleteAUser.pending, (state) => {
                state.isLoading = true
                state.message = "Pending"
            })
            .addCase(deleteAUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = "Fullfilled"
                state.deletedUsers = action.payload
            })
            .addCase(deleteAUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(updateAUser.pending, (state) => {
                state.isLoading = true
                state.message = "Pending"
            })
            .addCase(updateAUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.message = "Fullfilled"
                state.updatedRole = action.payload
            })
            .addCase(updateAUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(resetState, () => initialState)

    }
})

export default userSlice.reducer;