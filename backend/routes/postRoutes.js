const express = require("express")
const {
    createPost,
    updatePost,
    getAllPosts,
    deletePost,
    getSinglePost,
    getUserPosts
} = require("../controllers/postController");

const { authMiddleware, isAdmin } = require("../middlewares/authmiddlewares")

const router = express.Router()

router.post("/", authMiddleware, createPost)
router.get("/all", getAllPosts)
router.get("/:id", authMiddleware, getUserPosts)
router.put("/:id", authMiddleware, isAdmin, updatePost)
router.delete("/:id", authMiddleware, isAdmin, deletePost)
router.get("/details/:id", getSinglePost)

module.exports = router