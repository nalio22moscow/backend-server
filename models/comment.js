const   mongoose                = require("mongoose");


const commentSchema = new mongoose.Schema({
    commentText: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date
    },
    commentAuthor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        userName: String
    },
    commentApproved: String,
    commentCount: Number
});

module.exports = mongoose.model("Comment", commentSchema);