const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    id:String,
    text:String,
}) 


module.exports = mongoose.model("Todo",TodoSchema);
