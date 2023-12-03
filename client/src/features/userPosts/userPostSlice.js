import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit"
import userPostService from "./userPostService"
import { toast } from "react-toastify"

// get a post
export const getPost = createAsyncThunk("post/get-a-post", async (id) => {
    try {
        const res = await userPostService.getAPost(id)
        return res
    } catch (error) {
        console.log("error", error)
    }
})

// delete a post
export const deletePost = createAsyncThunk("post/delete-a-post", async (id) => {
    try {
        const res = await userPostService.deleteAPost(id)
        return res
    } catch (error) {
        console.log("error", error)
    }
})

export const createPost = createAsyncThunk("post/create-post", async(postData, thunkApi) => {
    try {
        return await userPostService.createPost(postData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

export const getPostByUser = createAsyncThunk("post/get-user-posts", async (id) => {
    try {
        const res = await userPostService.getPostsByUserId(id)
        return res
    } catch (error) {
        console.log("error", error)
    }
})

// update a post
export const updateAPost = createAsyncThunk("post/update-post", async(postData,thunkApi) => {
    try {
        return await userPostService.updatePost(postData)
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})

//reset state
export const resetState = createAction("Reset_All")


// define initial state
const postInitialState = {
    userPosts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const postSlice = createSlice({
    name: 'userPosts',
    initialState: postInitialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(createPost.pending, (state) => {
                state.isLoading = true;
                state.message = "Pending"
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.createdPost = action.payload;
                state.message = "Fulfilled"
                if (state.isSuccess === true) {
                    toast.success("Post Created Successfully")
                }
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Rejected"
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(getPost.pending, (state) => {
                state.isLoading = true;
                state.message = "Pending"
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.singlePost = action.payload;
                state.message = "Fulfilled"
            })
            .addCase(getPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Rejected"
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(getPostByUser.pending, (state) => {
                state.isLoading = true;
                state.message = "Pending"
            })
            .addCase(getPostByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.userPosts = action.payload;
                state.message = "Fulfilled"
            })
            .addCase(getPostByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Rejected"
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(updateAPost.pending, (state) => {
                state.isLoading = true;
                state.message = "Pending"
            })
            .addCase(updateAPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.updatedPost = action.payload;
                state.message = "Fulfilled"
                if (state.isSuccess === true) {
                    toast.success("Post Updated Successfully")
                }
            })
            .addCase(updateAPost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Rejected"
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
                state.message = "Pending"
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.deletedPost = action.payload;
                state.message = "Fulfilled"
                if (state.isSuccess === true) {
                    toast.success("Post Deleted Successfully")
                }
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = "Rejected"
                if (state.isError === true) {
                    toast.error(action.error)
                }
            })
            .addCase(resetState, () => postInitialState)
    }
})

export default postSlice.reducer;