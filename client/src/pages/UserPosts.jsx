import React, { useEffect } from 'react'
import PostCard from '../components/PostCard'
import { useSelector, useDispatch } from 'react-redux'
import { getPostByUser } from '../features/userPosts/userPostSlice'
import { Link } from 'react-router-dom'

const UserPosts = () => {
    const dispatch = useDispatch()

    // get user's posts
    const userPostsList = useSelector((state) => state?.userPosts)
    console.log(userPostsList)

    // get userId
    const userId = useSelector((state) => state.auth?.user?._id)

    const getPosts = () => {
        dispatch(getPostByUser(userId))
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div>
            {userPostsList?.isLoading ?
                <p className='text-center mt-5 fs-1'>Loading...</p> :
                (
                    <div className='container'>
                        <Link to={"/post"}>
                            <button className='btn btn-primary my-3'>Create Post</button>
                        </Link>
                        <div className='d-flex gap-3'>
                            {userPostsList?.userPosts?.length > 0 ?
                                userPostsList?.userPosts?.map((post, idx) => (
                                    <div key={idx}>
                                        <PostCard post={post} />
                                    </div>
                                )) : (
                                    <div>
                                        <h1 className='text-danger mx-auto mt-5'>Sorry, You have not created any post yet.</h1>
                                        <p className='fs-5'>If you want to view other people's post, Please click on All Posts. Thank you</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
        </div>
    )
}

export default UserPosts