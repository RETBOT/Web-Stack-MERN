const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const PostShema = mongoose.Schema({
    title: String,
    miniature: String,
    content: String,
    path: {
        type: String,
        unique: true,
    },
    created_at: Date,
});

PostShema.plugin(mongoosePaginate);

module.exports = mongoose.model("Post", PostShema);