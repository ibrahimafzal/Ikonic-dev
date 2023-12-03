import axios from "../../utils/axios"

const getPosts = async () => {
    const res = await axios.get("post/all")
    if (res?.data) {
        return res.data;
    }
}

const getAPost = async (id) => {
    const res = await axios.get(`/post/${id}`);
    if (res?.data) {
        return res?.data;
    }
}



const postService = {
    getPosts,
    getAPost,
}

export default postService