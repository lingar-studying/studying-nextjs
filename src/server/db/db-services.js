import mongoose from "mongoose";
import {generateId} from "../bookmarks/mock-data-bookmarks"; // Fix the import
// const mongoose = require("mongoose");
import {mockBookmarks} from "../bookmarks/mock-data-bookmarks";
import {SimpleUserScheme} from "@/server/users/simple-user";
//general configuration
const DATABASE_NAME = "BookmarksApp";
const MONGO_URI = "mongodb://lingar:12345678@localhost:27017/" + DATABASE_NAME + "?authSource=admin";

const BookmarkSchemaShape = {
    bookName: String,
    sectionNum: Number,
    currentPage: Number,
    quote: String,
    isActiveLast2Weeks: Boolean,
    comment: {
        type: mongoose.Schema.Types.Mixed,  // Can store any kind of data
        required: false,
    }


};
let BookmarkModel = null;
let bookmarkScheme = null;

let cached = global.mongoose || {conn: null, promise: null};

let isConnected = false;




//Initial connection to DB
export const connectDB2 = async (uri, callback) => {
    if (isConnected) return;

    try {
        await mongoose.connect(MONGO_URI, {serverSelectionTimeoutMS: 5000});
        isConnected = true;
        await createInitData();
        console.log("db connected by mongoose 222");
    } catch (e) {
        if (e.name === "MongoServerError" && e.code === 18) {
            console.error("Wrong credentials! \n***CHECK THE CREDENTIALS ON THE URI***");
           // alert("wwww");
            throw "Authentication error";
        }
        console.log("Error in mongoose connection 222\n", e);
        throw "error on mongoose";


    }
};

//init bookmarks if not exist
export const createInitData = async () => {

    //create DB - if not exist - happens from the connection URI
    //Create Table bookmarks - if not exist
    const collections = await mongoose.connection.db.listCollections().toArray();
    const exist = collections.some(item=> item.name === "bookmarks");
    //creating scheme = shape of the collection to create
    bookmarkScheme = new mongoose.Schema(BookmarkSchemaShape);

    //creating init SimpleUserScheme
    const simpleUserScheme = new mongoose.Schema(SimpleUserScheme);
    //creating the collection
    // BookmarkModel = mongoose.model('bookmarks', bookmarkScheme);

    const userExists = collections.some(item=> item.name === "simpleUsers");

    if(!userExists) {
        mongoose.model('simpleUsers', simpleUserScheme);
    }

    try {
        BookmarkModel = mongoose.model('bookmarks'); // Try to access the model

    } catch (err) {
        // If the model doesn't exist, create it
        BookmarkModel = mongoose.model('bookmarks', bookmarkScheme);
    }
    if(!exist){
        console.log("not exist")
        let data = [...mockBookmarks];

        data = data.map(item=>{
            item.bookName = item.bookName + " --->DB";
            return item;
        })
        // for(let i =0; i < data.length; i++){
        //     const entity = new BookmarkModel(data[i]);
        //
        //     await entity.save();
        // }
        await Promise.all(data.map(item => {
            const entity = new BookmarkModel(item);
            return entity.save();
        }));
        console.log('Data inserted successfully!');
    }

}


export const getAllBookmarks = async () =>{


    let BookmarkModel2;
    try {
        BookmarkModel2 = mongoose.model('bookmarks'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        BookmarkModel2 = mongoose.model('bookmarks', bookmarkScheme);
    }
    const data = await BookmarkModel2.find();
    // console.log("data from getALlBookmarks = " , data);
    return data;
}

export const getBookmark = async (id) =>{
    let BookmarkModel2;
    try {
        BookmarkModel2 = mongoose.model('bookmarks'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        BookmarkModel2 = mongoose.model('bookmarks', bookmarkScheme);
    }
    return await BookmarkModel2.findById(id);
}

// const addStockToDb = new StockModel(stock);
// return  addStockToDb.save();
export const createBookmark = async (bookmark) => {

    let BookmarkModel2;
    try {
        BookmarkModel2 = mongoose.model('bookmarks'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        BookmarkModel2 = mongoose.model('bookmarks', bookmarkScheme);
    }
    const newBookmarkItem = new BookmarkModel2(bookmark);
    return await newBookmarkItem.save();
}


export const updateBookmark = async (bookmark) => {
    console.log("bookmark = ", bookmark);

    let BookmarkModel2;
    try {
        BookmarkModel2 = mongoose.model('bookmarks'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        BookmarkModel2 = mongoose.model('bookmarks', bookmarkScheme);
    }

    // delete bookmark.currentPage;//possible to pass only required update properties.
    try {
        const result = await BookmarkModel2.updateOne(
            { _id: bookmark._id }, // Find by ID
            { $set: bookmark } // Use $set to update the fields
        );

        if (result.nModified === 0) {
            throw new Error('Bookmark not found or no changes made');
        }

        return result;
    } catch (error) {
        console.error('Error updating bookmark:', error);
        throw error;
    }
}

export const deleteBookmark = async(id) =>{


    console.log("id = ", id)

    let BookmarkModel2;
    try {
        BookmarkModel2 = mongoose.model('bookmarks'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        BookmarkModel2 = mongoose.model('bookmarks', bookmarkScheme);
    }
    const toDelete = await BookmarkModel2.findById(id);
    await toDelete.deleteOne();

    // return {success: true};
}
////////////////////*******END OF BOOKMARKS METHODS****////////////////////////////////////////














//for studying:


//old
export async function connectToDatabase() {
    if (cached.conn) return cached.conn; // Return cached connection if available
    console.log("working? ")
    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((mongoose) => mongoose).catch((error) => {
                console.error("Error connecting to MongoDB:", error);
                throw new Error("Failed to connect to MongoDB lingar");
            });
    }

    cached.conn = await cached.promise;
    global.mongoose = cached; // Save cache globally

    console.log("Connected to MongoDB");
    return cached.conn;
}

//traditinal
export const connectDBOLD = () => {
    mongoose.connect(MONGO_URI)//mongodb://lingar:12345678@localhost:27017 - without password: mongodb://localhost:27017
        .then(() => console.log("db connected by mongoose"))
        .catch((e) => {
            console.log("Error in mongoose connection", e);
            throw ("error on mongoose")
        });
}
