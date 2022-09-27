const mongoose = require('mongoose');

// Schema is basically a set of rules or instructions created for a model,
// so that the entering of data in database is systematic
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        profilePic:
        {
            type: String,
            default: "",
        }
    },
    { timestamps: true }            // this will automatically create our 'updated at' and 'created at' times.
)
module.exports = mongoose.model("User", UserSchema);  // the schema created is passed to the model it is created for.