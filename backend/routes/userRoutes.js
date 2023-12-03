const express = require("express")
const { createUser, login, getAllUsers, deleteUser, updateAUser } = require("../controllers/userController");
const { authMiddleware, isAdmin } = require("../middlewares/authmiddlewares");


const router = express.Router()

router.post("/register", createUser)
router.put("/update/:id", updateAUser)
router.post("/login", login)
router.get("/all-users",authMiddleware, isAdmin, getAllUsers)
router.delete("/delete/:id", authMiddleware, isAdmin, deleteUser)

module.exports = router
