import mongoose from "mongoose";

export const EncryptedUserScheme = {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 60,
        maxlength: 100, // for be sure
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    comment: String,
    // isAdmin: Boolean,




};

export const encryptedUserScheme = new mongoose.Schema(EncryptedUserScheme);
