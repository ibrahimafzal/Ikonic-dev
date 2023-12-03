import React from 'react'
import { Link } from 'react-router-dom'
import IMAGE from "../assets/aaa.jpg"

const PostCard = ({ post }) => {


    return (
        <div>
            <div className="card">
                <div className="card-header p-0">
                    <img src={IMAGE} alt="mern stack" style={{maxWidth: "100%", height: "auto"}} />
                </div>
                <div className="card-body">
                    <span className="tag tag-teal mb-2 fs-6">{post?.author}</span>
                    <h4 className='text-capitalize'>
                        {post?.title.substring(0,20)}...
                    </h4>
                    <p className='fs-6'>
                        {post?.description.substring(0,85)}...
                    </p>
                    <div className="user">
                    <Link to={`/detail/${post?._id}`}>
                        <button className="btn btn-primary">Read More</button>
                    </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard
