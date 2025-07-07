import Users from "../models/Users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }
        // hashpassword
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        const newUser = new Users({ name, email, password: hashedPassword });
        await newUser.save();
        // Return response
        res.status(200).json({
            success: true,
            message: "Successfully Registered.",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message || "Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check if the user exists
        const existinguser = await Users.findOne({ email });
        if (!existinguser) return res.status(404).json({ message: "User Not Found" });

        // check if the password matches
        const ispasswordcorrect = await bcrypt.compare(password, existinguser.password);
        if (ispasswordcorrect) {
            // create token
            const token = jwt.sign(
                {
                    id: existinguser._id,
                    name: existinguser.name,
                    email: existinguser.email
                },
                process.env.JWT_Secret,
                { expiresIn: '1h' } // Set token to expire in 1 hour
            );
            // Set token in HttpOnly cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // only send cookie over HTTPS in production
                sameSite: 'lax',
                maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
            });
            // return token with user info and expiry duration (optional)
            res.status(200).json({
                message: `${existinguser.name} successfully logged in`,
                token,
                expiresIn: 3600, // Optional: inform frontend about expiry in seconds
                user: {
                    id: existinguser._id,
                    name: existinguser.name,
                    email: existinguser.email
                }
            });
        } else {
            res.status(400).json({ message: 'Wrong password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
};



export const logout = (req, res) => {
    // Clear the token cookie by setting it empty and expired immediately
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0), // Set expiry to a past date
    });

    res.status(200).json({ message: 'Logged out successfully' });
};
