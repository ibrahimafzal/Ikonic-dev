const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    numViews: {
        type: Number,
        default: 0,
    },
    author: {
        type: String,
        required: true,
    },
    image: [],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

//Export the model
module.exports = mongoose.model('posts', postSchema);