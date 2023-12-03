import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MERN from "../assets/aaa.jpg"
import { getPost, deletePost } from "../features/userPosts/userPostSlice"
import { toast } from 'react-toastify';

const SinglePostDetails = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const postId = params.id

  // Auth State
  const authState = useSelector((state) => state?.auth?.user)

  const deleteThePost = () => {
    dispatch(deletePost(postId))
    navigate("/")
    toast.success("Post deleted successfully!🤗")

  }

  const getAPost = () => {
    dispatch(getPost(postId))
  }

  useEffect(() => {
    if (postId) {
      getAPost()
    }
  }, [postId])

  const newPost = useSelector((state) => state?.userPosts)
  const { singlePost } = newPost

  return (
    <div className='container d-flex flex-column justify-content-center my-5'>
      <Link to={"/"}>
        <button className='btn btn-primary mb-5'> Back</button>
      </Link>
      <h1 className=''>{singlePost?.title}</h1>
      <div>
        <img src={MERN} alt="" />
        <p className='mt-2'><span className='text-primary fw-bold'>Author Name: </span>{singlePost?.author}</p>
      </div>
      <p dangerouslySetInnerHTML={{ __html: singlePost?.description }}></p>

      { (authState?.role === 'admin' || authState?._id === singlePost?.userId) &&
        <div className="d-flex gap-5">
        <Link to={`/post/${singlePost?._id}`}>
          <button className="btn-primary btn">Update Post</button>
        </Link>
        <button className="btn-danger btn" onClick={deleteThePost}>Delete Post</button>
      </div>
      }
    </div>
  )
}

export default SinglePostDetails