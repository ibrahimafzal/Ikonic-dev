import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAUser, getUsers, resetState, updateAUser } from '../features/user/userSlice'
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai"
import { toast } from 'react-toastify'
import { getAllPosts } from '../features/posts/postSlice'
import { Link } from 'react-router-dom'
import { deletePost, updateAPost } from '../features/userPosts/userPostSlice'

const Admin = () => {
  const dispatch = useDispatch()

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPost, setSelectedPost] = useState("");
  const [activeSection, setActiveSection] = useState('All Users');


  // Check if the description length exceeds the maximum length
  const truncateDescription = (description, maxLength) => {
    if (description && description.length > maxLength) {
      const truncatedDescription = `${description.substring(0, maxLength)}...`;
      return truncatedDescription;
    } else {
      return description;
    }
  };

  const handleAllUsersClick = () => {
    setActiveSection('All Users');
  };

  const handleAllPostsClick = () => {
    setActiveSection('All Posts');
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
  };

  const handlePostSelection = (post) => {
    setSelectedPost(post);
  };

  const handleRoleChange = (event) => {
    const updatedRole = event.target.value;
    setSelectedUser({ ...selectedUser, role: updatedRole });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedSelectedPost = { ...selectedPost, [name]: value };
    setSelectedPost(updatedSelectedPost);
  };

  const users = useSelector((state) => state?.auth?.allUsers)
  const allPosts = useSelector((state) => state?.post?.posts)

  const getPosts = () => {
    dispatch(getAllPosts())
  }

  useEffect(() => {
    getPosts()
  }, [])


  const getAllUsersForAdmin = () => {
    dispatch(getUsers())
  }

  const deleteTheUser = (id) => {
    dispatch(deleteAUser(id))
    toast.success("User Deleted Successfully!🤗")
    setTimeout(() => {
      dispatch(resetState())
      window.location.reload()
    }, 1000)
  }

  const updateTheUserRole = (user) => {
    dispatch(updateAUser(user))
    toast.success("User Updated successfully!🤗")
    setTimeout(() => {
      dispatch(resetState())
      window.location.reload()
    }, 1000)
  }

  const updatePost = (post) => {
    const data = {id: post?.id, postData: post}
    dispatch(updateAPost(data))
    toast.success("Post Updated successfully!🤗")
    setTimeout(() => {
      dispatch(resetState())
      window.location.reload()
    }, 1000)
  }

  const deleteThePost = (id) => {
    dispatch(deletePost(id))
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  useEffect(() => {
    getAllUsersForAdmin()
  }, [])

  return (
    <div className='mx-0 mx-sm-5 my-5'>
      <div className='mx-1 mx-sm-3'>
        {/* <AdminSidebar /> */}
        <div className="col-12 d-flex justify-content-center">
          <nav className='d-flex gap-2'>
            <button
              onClick={handleAllUsersClick}
              className='btn btn-primary'
            >
              All Users
            </button>
            <button
              className='btn btn-primary'
              onClick={handleAllPostsClick}
            >
              All Posts
            </button>
          </nav>
        </div>
        {/* all users */}
        {activeSection === "All Users" && (
          <div className="col-12 mt-5">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, idx = 0) => (
                  <tr key={idx + 1}>
                    <td>{idx + 1}</td>
                    <td className='text-capitalize'>
                      {user?.firstname + " " + user?.lastname}
                    </td>
                    <td>{user?.email}</td>
                    <td>{user?.mobile}</td>
                    <td className='text-capitalize'>{user?.role}</td>
                    <td className='d-flex align-items-center'>
                      <button type="button" onClick={() => handleUserSelection(user)} className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <AiOutlineEdit className='fs-5 edit-delete cursor-pointer' />
                      </button>
                      <AiTwotoneDelete
                        onClick={() => deleteTheUser(user?._id)}
                        className='fs-5 text-danger cursor-pointer' />
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        )}
        {/* user Modal */}
        {activeSection === "All Users" && (
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Update User Role</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form action="">
                    <input type="text" onChange={handleRoleChange} value={selectedUser?.role} className="form-control" required />
                  </form>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setSelectedUser("")}>
                      Close
                    </button>
                    <button onClick={() => { updateTheUserRole(selectedUser) }} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        }




        {/* all posts */}
        {activeSection === "All Posts" && (
          <div className="col-12 mt-5">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allPosts?.map((post, idx = 0) => (
                  <tr key={idx + 1}>
                    <td>{idx + 1}</td>
                    <td className='text-capitalize'>
                      <Link to={`/detail/${post?.id}`} className='text-decoration-none' style={{ color: "black" }}>
                        {post?.title}
                      </Link>
                    </td>
                    <td dangerouslySetInnerHTML={{ __html: truncateDescription(post?.description, 200) }}></td>
                    <td>{post?.author}</td>
                    <td>{post?.category}</td>
                    <td className=''>
                      <div className='d-flex align-items-center'>
                        <button type="btn" onClick={() => handlePostSelection(post)} className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                          <AiOutlineEdit className='fs-5 cursor-pointer' />
                        </button>
                        <button className='btn'>
                          <AiTwotoneDelete
                            onClick={() => deleteThePost(post?._id)}
                            className='fs-5 text-danger cursor-pointer'
                          />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
                }
              </tbody>
            </table>
          </div>
        )}
        {/* post Modal */}
        {activeSection === "All Posts" && (
          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Update Post</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form action="">
                    <label className='fw-bold'>Title:</label>
                    <input type="text" name='title' onChange={handleChange} value={selectedPost?.title} className="form-control" required />
                    <label className='mt-4 fw-bold'>Description</label>
                    <textarea type="text" name='description' onChange={handleChange} value={selectedPost?.description} className="form-control" required />
                    <label className='mt-4 fw-bold'>Author</label>
                    <input type="text" name='author' onChange={handleChange} value={selectedPost?.author} className="form-control" required />
                    <label className='mt-4 fw-bold'>Category</label>
                    <input type="text" name='category' onChange={handleChange} value={selectedPost?.category} className="form-control" required />
                  </form>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                      Close
                    </button>
                    <button onClick={() => { updatePost(selectedPost) }} type="button" className="btn btn-primary" data-bs-dismiss="modal">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default Admin