import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import PostCard from "../components/PostCard";
import {
    getAllPosts,
} from '../features/posts/postSlice';

const Post = () => {
    const dispatch = useDispatch()
    const postList = useSelector((state) => state?.post?.posts)

    const getPosts = () => {
        dispatch(getAllPosts())
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="my-5">
            <h1 className='text-center mb-4'>All Users Posts</h1>
            <div className='d-flex gap-3 flex-wrap justify-content-center'>
                {
                    postList?.map((post, idx) => (
                        <div key={idx}>
                            <PostCard post={post} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Post