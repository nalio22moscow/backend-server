const   mongoose                = require("mongoose");


const postSchema = new mongoose.Schema({
    postName: {
        title: String,
        slug: String,
        link: String
    },
    postText: {
        longText: String,
        shortText: String
    },
    postMedia: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Media"
        }
    ],
    postMetaData: {
        createdAt: {
            type: Date,
            default: Date.now
        },
        modifiedAt: {
            type: Date,
            default: ""
        },
        author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            userName: String
        },    
    },
    postComments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"    
        }
    ],
    postStatus: String,
    postType: String,
    postTerms: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Terms"
        }
    }
});

module.exports = mongoose.model("Post", postSchema);