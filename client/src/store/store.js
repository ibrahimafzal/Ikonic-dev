import { configureStore } from "@reduxjs/toolkit"
// import authReducer from "../features/user/userSlice"
import postReducer from "../features/posts/postSlice"
import authReducer from "../features/user/userSlice"
import userPostsReducer from "../features/userPosts/userPostSlice"


export const store = configureStore({
    reducer: {
        post: postReducer,
        auth: authReducer,
        userPosts: userPostsReducer
    }
})