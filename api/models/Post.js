const mongoose = require('mongoose');

// Schema is basically a set of rules or instructions that created of a model,
// so that the entering of data in database is systematic
const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        desc: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true
        },
        categories: {
            type: Array,
            required: false
        }
    },
    { timestamps: true }            // this will automatically create our 'updated at' and 'created at' times.
)

module.exports = mongoose.model("Post", PostSchema);  // the schema created is passed to the model it is created for.