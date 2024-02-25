import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'

export const signup = async(req, res, next) => {
    //console.log(req.body)
    const { username, email, password } = req.body; //we get username, email, password from req.body
    const hashedPassword = bcryptjs.hashSync(password, 10);//hides password in database
    const newUser = new User({ username, email, password: hashedPassword }) //use our User model to save in the database
    try {
        await newUser.save() //save in our database
        res.status(201).json('user created successfully')
    } catch (error) {
        next(error);
    }
};