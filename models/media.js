const   mongoose                = require("mongoose");


const mediaSchema = new mongoose.Schema({
    Media: {
        Id: String,
        Url: String,
        text: String,
    },
    mediaType: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date
    }
});

module.exports = mongoose.model("Media", mediaSchema);