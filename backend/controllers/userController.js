const mongoose = require("mongoose");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwToken");
const { generateRefreshToken } = require("../config/refreshToken");
const asyncHandler = require("express-async-handler")
const validateMongodbId = require("../utils/validateMongodbId")


// Register a user/ Create user
const createUser = asyncHandler(async (req, res) => {
    try {
        //get the email from body
        const email = req.body.email

        //now with the help of email, find the user exists or not
        const findUser = await User.findOne({ email: email })

        if (!findUser) {
            //create user
            const createUser = await User.create(req.body)
            res.json(createUser)
        } else {
            throw new Error("User Already Exist")
        }
    } catch (error) {
        throw new Error(error?.message)
    }
}
)

// get all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find()
        return res.json(users);
    } catch (error) {
        throw new Error(error?.message)
    }
})

// Login a user
const login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        //check if user is exist or not
        const findUser = await User.findOne({ email })
        if (findUser && (await findUser.isPasswordMatched(password))) {
            const refreshToken = generateRefreshToken(findUser?._id)
            const updateUser = await User.findByIdAndUpdate(findUser?._id, {
                refreshToken: refreshToken
            }, { new: true })
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000
            })
            res.status(200).json({
                _id: findUser?._id,
                firstname: findUser?.firstname,
                lastname: findUser?.lastname,
                email: findUser?.email,
                mobile: findUser?.mobile,
                role: findUser?.role,
                token: generateToken(findUser?._id)
            })
        } else {
            throw new Error("Invalid Credentials")
        }
    } catch (error) {
        throw new Error(error)
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        res.json(deleteUser)
    } catch (error) {
        throw new Error(error.message)
    }
})

const updateAUser = asyncHandler(async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        user = await User.findByIdAndUpdate(req.params.id, {
            role: req.body.role
        }, { new: true })
        res.json(user)
    } catch (error) {
        throw new Error(error.message)
    }
})

module.exports = { createUser, login, getAllUsers, deleteUser, updateAUser }