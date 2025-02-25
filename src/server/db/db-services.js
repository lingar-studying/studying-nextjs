import  mongoose from "mongoose"; // Fix the import
// const mongoose = require("mongoose");

const MONGO_URI = "mongodb://lingar:12345678@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";


let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
    if (cached.conn) return cached.conn; // Return cached connection if available
    console.log("working? ")
    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((mongoose) => mongoose) .catch((error) => {
                console.error("Error connecting to MongoDB:", error);
                throw new Error("Failed to connect to MongoDB lingar");
            });
    }

    cached.conn = await cached.promise;
    global.mongoose = cached; // Save cache globally

    console.log("Connected to MongoDB");
    return cached.conn;
}

export const connectDB = () => {
    mongoose.connect(MONGO_URI)//mongodb://lingar:12345678@localhost:27017 - without password: mongodb://localhost:27017
        .then(() => console.log("db connected by mongoose"))
        .catch((e) => console.log("Error in mongoose connection", e));


}
