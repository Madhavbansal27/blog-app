const { Schema, model, default: mongoose } = require("mongoose");

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
},{timestamps:true});

const comment = model("comment", commentSchema)

module.exports = comment;
