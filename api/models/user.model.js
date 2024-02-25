import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true //this means no one can have the same username
    },
    email: {
        type: String,
        require: true,
        unique: true //this means no one can have the same username
    },
    password: {
        type: String,
        require: true
    },
    
}, { timestamps: true }); //is going to tells us when the user was crated

const User = mongoose.model('User', userSchema);

export default User;