const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    cover: {
        type: String,
        require: true
    }
})
module.exports = mongoose.model("Category", CategorySchema)