import React, { useEffect } from 'react'
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom"
import { createPost, getPost, resetState, updateAPost } from '../features/userPosts/userPostSlice';


let schema = object({
  title: string().required("Title is required!"),
  description: string().required("Description is required!"),
  category: string().required("Category is required!"),
  author: string().required("Author is required!"),
});

const AddPost = () => {

  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const postId = params?.id

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

  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: singlePost?.title || '',
      description: singlePost?.description || '',
      category: singlePost?.category || "",
      author: singlePost?.author || ""
    },
    validationSchema: schema,
    onSubmit: values => {
      if (postId !== undefined) {
          const data = { id: postId, postData: values }
          dispatch(updateAPost(data))
          dispatch(resetState())
          toast.success("Blog updated successfully!🤗")
      } else {
          dispatch(createPost(values))
          toast.success("Blog added successfully!🤗")
      }
      formik.resetForm();
      setTimeout(() => {
          dispatch(resetState());
          navigate("/view-my-posts")
      }, 2200);
    },
  });

  useEffect(() => {
    dispatch(resetState())
}, [dispatch])

useEffect(() => {
  if (newPost?.isError) {
      toast.error("Something went wrong!😲")
  }
}, [newPost?.isSuccess, newPost?.isError])


  return (
    <div className='container my-5'>
      <h3 className="mb-4 fw-bold text-center">{postId !== undefined ? "Edit" : "Add"} Post</h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit} >
          {/* Title */}
          <div className='mt-4'>
            <label className='fw-bold'>Title:</label>
            <input
              type="text"
              label="Enter Blog Title"
              name="title"
              className='form-control'
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              value={formik.values.title}
            />
          </div>
          <div className="formik-error mb-3">
            {formik.touched.title && formik.errors.title}
          </div>
          {/* category */}
          <div className='mt-4'>
          <label className='fw-bold'>Category:</label>
            <input
              type="text"
              className='form-control'
              label="Enter Blog Title"
              name="category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
            />
          </div>
          <div className="formik-error mb-3">
            {formik.touched.category && formik.errors.category}
          </div>
          {/* author */}
          <div className='mt-4'>
          <label className='fw-bold'>Author:</label>
            <input
              type="text"
              label="Enter Blog Title"
              name="author"
              className='form-control'
              onChange={formik.handleChange("author")}
              onBlur={formik.handleBlur("author")}
              value={formik.values.author}
            />
          </div>
          <div className="formik-error mb-3">
            {formik.touched.author && formik.errors.author}
          </div>

          {/* Text Editor */}
          <h6 className='fw-bold ms-1 mb-0'>Enter Description:</h6>
          <textarea
            className='form-control'
            rows={8}
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className="formik-error mb-3">
            {formik.touched.description && formik.errors.description}
          </div>

          {/* Button */}
          <button type='submit' className='btn button btn-success border-0 rounded-3 my-5 '>{postId !== undefined ? "Update" : "Add"} Post</button>
        </form>
      </div>
    </div>
  )
}

export default AddPost