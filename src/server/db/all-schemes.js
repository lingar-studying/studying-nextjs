import mongoose from "mongoose";

export const CarScheme =new mongoose.Schema(
    {
        manufacturer: String,
        model: String,
        year: Number,
        owner: String,
        color: String,
    }
);