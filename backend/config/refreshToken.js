const jwt = require("jsonwebtoken")

const generateRefreshToken = (id) => { //we use id for generate the token
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" })
}

module.exports = { generateRefreshToken }