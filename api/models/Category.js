const mongoose = require('mongoose');

// Schema is basically a set of rules or instructions that created of a model,
// so that the entering of data in database is systematic
const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
    },
    { timestamps: true }            // this will automatically create our 'updated at' and 'created at' times.
)

module.exports = mongoose.model("Category", CategorySchema);  // the schema created is passed to the model it is created for.