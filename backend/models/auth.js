const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
    name : { type : String, required : true },
    email : { type : String, required : true },
    password : { type : String},
    isSocial : {type : Boolean}
});

const user = mongoose.model(`user`, userSchema);
module.exports = user;