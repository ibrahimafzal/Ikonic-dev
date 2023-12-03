const Post = require("../models/postModel")
const User = require("../models/userModel")

const asyncHandler = require("express-async-handler")
const validateMongodbId = require("../utils/validateMongodbId")


// CREATE POST
const createPost = asyncHandler(async (req, res) => {
    try {
        const newPost = await Post.create({...req.body, userId: req.user._id})
        res.json(newPost)
    } catch (error) {
        throw new Error(error.message)
    }
})

// GET ALL POSTS
const getUserPosts = asyncHandler(async (req, res) => {
    const {id} = req.params
    try {
        const getPosts = await Post.find({userId: id})
        res.json(getPosts)
    } catch (error) {
        throw new Error(error.message)
    }
})



// GET ALL POSTS
const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const getPosts = await Post.find()
        res.json(getPosts)
    } catch (error) {
        throw new Error(error.message)
    }
})

//UPDATE POST
const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        const updatePost = await Post.findByIdAndUpdate(id, req.body, { new: true })
        res.json(updatePost)
    } catch (error) {
        throw new Error(error.message)
    }
})

//UPDATE POST
const getSinglePost = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)

    try {
        const getPost = await Post.findById(id)
        res.json(getPost)
    } catch (error) {
        throw new Error(error.message)
    }
})

// DELETE A POST
const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongodbId(id)
    try {
        const deletePost = await Post.findByIdAndDelete(id)
        res.json(deletePost)
    } catch (error) {
        throw new Error(error.message)
    }
})

module.exports = { createPost, updatePost, getAllPosts, getSinglePost, deletePost, getUserPosts }

