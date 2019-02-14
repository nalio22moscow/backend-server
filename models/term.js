const   mongoose                = require("mongoose");


const termSchema = new mongoose.Schema({
    term: {
        name: String,
        slug: String,
        link: String,
        text: String,
    },
    termType: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date
    }
});

module.exports = mongoose.model("Term", termSchema);