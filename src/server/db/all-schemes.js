import mongoose from "mongoose";


export const CarScheme = new mongoose.Schema(
    {
        manufacturer: String,
        model: String,
        year: Number,
        owner: String,
        color: String,
        carId: Number,


    }
);


export const GiftScheme = new mongoose.Schema({
    drink: String,
    size: Number,

}, {_id: false});
export const GlassScheme = new mongoose.Schema(
    {
        color: String,
        price: Number,
        innerGift: GiftScheme


    },
    {
        strict: false,
        timestamps: true,
        id: false//make id become undefined.



    }
);


