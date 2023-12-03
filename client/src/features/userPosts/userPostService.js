import axios from "../../utils/axios"

const createPost = async(post) => {
    const res = await axios.post("post/", post)
    return res?.data
}

const getPostsByUserId = async(id) => {
    const res = await axios.get(`post/${id}`)
    if (res?.data) {
        return res.data;
    }
}

// update blog
const updatePost = async (post) => {
    const res = await axios.put(`post/${post.id}`, {
        title: post?.postData?.title,
        description: post?.postData?.description,
        category: post?.postData?.category,
        author: post?.postData?.author
    })
    return res?.data
}

// get a post
const getAPost = async (id) => {
    const res = await axios.get(`/post/details/${id}`);
    if (res?.data) {
        return res.data;
    }
}

// delete a post
const deleteAPost = async (id) => {
    const res = await axios.delete(`/post/${id}`);
    if (res?.data) {
        return res.data;
    }
}

const userPostsService = {
    getAPost,
    createPost,
    getPostsByUserId,
    updatePost,
    deleteAPost
}

export default userPostsService