const { ObjectId } = require("mongodb")


const validateMongodbId = (id) => {
    const isValid = ObjectId.isValid(id)
    if (!isValid) throw new Error(`${id} is not valid or not found!`)
}

module.exports = validateMongodbId