import User from "../models/user.model.js";
import bscryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (
        !username ||
        !email ||
        !password ||
        username === "" ||
        email === "" ||
        password === ""
    ) {
        // return res.status(400).json({ message: "All fields are required" });
        next(errorHandler(400, "All fields are required"))
    }

    const hashPassword = bscryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashPassword,
    });

    try {
        await newUser.save();
        res.json("Signup sussessful");
    } catch (error) {
        // res.status(500).json({ message: error.message });
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            next(errorHandler(404, 'User not found'));
        }

        const validPassword = bscryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'Invalid Password!'));
        }

        const token = jwt.sign(
            { id: validUser._id , isAdmin: validUser.isAdmin}, process.env.JWT_SECRET_KEY
        )

        const {password : pass , ...rest} = validUser._doc;

        res.status(200).cookie('access_token', token, {
            httponly: true
        }).json(rest)

    } catch (error) {
        next(error);
    }

}

export const google = async (req, res, next) => {

    const { email, name , googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });

        if(user){
            const token = jwt.sign({ id: user._id , isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY);
            const {password, ...rest} = user._doc;
            res.status(200).cookie('access_token', token , {
                httponly : true
            }).json(rest)
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bscryptjs.hashSync(generatedPassword , 10);
            const newUser = new User({
                username : name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password : hashPassword,
                profilePicture :  googlePhotoUrl
            })
            await newUser.save();
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin} , process.env.JWT_SECRET_KEY);
            const {password, ...rest} = newUser._doc;
            res.status(200).cookie('access_token', token , {
                httponly : true
            }).json(rest)
        }

    } catch (error) {
        console.error("Error in google controller:", error);
        next(error);
    }

}