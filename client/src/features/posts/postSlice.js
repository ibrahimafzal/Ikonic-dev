import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postService from "./postService"
import { toast } from "react-toastify"

//  get all posts
export const getAllPosts = createAsyncThunk("posts/get-all-posts", async () => {
    try {
        const res = await postService.getPosts()
        return res
    } catch (error) {
        console.log("error", error)
    }
})

// get a blog
export const getPost = createAsyncThunk("post/get-a-post", async (id) => {
    try {
        return await postService.getAPost(id)
    } catch (error) {
        console.log("error", error)
    }
})



// define initial state
const postInitialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

export const postSlice = createSlice({
    name: 'post',
    initialState: postInitialState,
    reducers: {},
    extraReducers: builder => {
        // Get All Posts
        builder.addCase(getAllPosts.pending, (state) => {
            state.isLoading = true;
            state.message = "Pending"
        })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.posts = action.payload;
                state.message = "Fulfilled"
            })
            .addCase(getAllPosts.rejected, (state, action) => {
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
                state.postTitle = action.payload.title;
                state.postDescription = action.payload.description;
                state.postAuthor = action.payload.author;
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
    }
})

export default postSlice.reducer;
