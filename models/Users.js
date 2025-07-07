// models/User.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // ✅ fixed spelling
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

// Recommended: Model name should be singular
const User = mongoose.model('Users', userSchema);

export default User;
