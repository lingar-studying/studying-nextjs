import mongoose from "mongoose";

const UserScheme = {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    quote: String,
    isActiveLast2Weeks: Boolean,
    comment: {
        type: mongoose.Schema.Types.Mixed,  // Can store any kind of data
        required: false,
    }


};