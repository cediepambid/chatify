import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";


export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

    try {
        // validation
        if(!fullName || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        // password length validation
        if(password.length < 6) {
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        // email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }

        // check if user already exists
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User already exists"});

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        // save user to database
        if(newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            });

            //todo: send welcome email
            

        }else{
            res.status(400).json({message: "Invalid user data"});
        }

    } catch (error) {
        // Handle errors
        console.error("Error in signup controller:", error);
        res.status(500).json({message: "Internal Server error"});
    }
}

export const login = async  (req, res) => {
    res.send("Login endpoint");
}

export const logout = (req, res) => {
    res.send("Logout endpoint");
}