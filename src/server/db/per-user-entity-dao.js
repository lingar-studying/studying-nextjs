import mongoose from "mongoose";
import {connectDB2} from "@/server/db/db-services";

const DATABASE_NAME = "lingar_db";
const MONGO_URI = "mongodb://lingar:12345678@localhost:27017/" + DATABASE_NAME + "?authSource=admin";

let cached = global.mongoose || {conn: null, promise: null};

////////////////////*******END OF GENERAL ENTITIES METHODS****////////////////////////////////////////


export const getAllEntities = async (id, entityName, optionalScheme=null) =>{

    await connectDB2();

    let EntityModel ;
    try {
        EntityModel = mongoose.model(entityName); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        if (optionalScheme == undefined || optionalScheme == null) {
            EntityModel = mongoose.model(entityName, new mongoose.Schema({}, {strict: false}));

        } else {
            EntityModel = mongoose.model(entityName, optionalScheme);

        }
    }
    const data = await EntityModel.findById(id);
    // console.log("data from getALlBookmarks = " , data);
    return data;
}

export const getEntity = async (entityName, id, optionalScheme = null) =>{
    let EntityModel;
    try {
        EntityModel = mongoose.model(entityName); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        if (optionalScheme == undefined || optionalScheme == null) {
            EntityModel = mongoose.model(entityName, new mongoose.Schema({}, {strict: false}));

        } else {
            EntityModel = mongoose.model(entityName, optionalScheme);

        }
    }
    return EntityModel.findById(id);
}


// return  addStockToDb.save();
export const createEntity = async (data, entityName, optionalScheme = null) => {

    let EntityModel;
    try {
        EntityModel = mongoose.model(entityName); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        if (optionalScheme == undefined || optionalScheme == null) {
            EntityModel = mongoose.model(entityName, new mongoose.Schema({}, {strict: false}));

        } else {
            EntityModel = mongoose.model(entityName, optionalScheme);

        }
    }
    const newItem = new EntityModel(data);
    return await newItem.save();
}


export const updateEntity = async (data, entityName, optionalScheme = null) => {

    let EntityModel;
    try {
        EntityModel = mongoose.model(entityName); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        if (optionalScheme == undefined || optionalScheme == null) {
            EntityModel = mongoose.model(entityName, new mongoose.Schema({}, {strict: false}));

        } else {
            EntityModel = mongoose.model(entityName, optionalScheme);

        }
    }

    // delete bookmark.currentPage;//possible to pass only required update properties.
    try {

        //this working, but return the updated object
        // const result = await EntityModel.updateOne(
        //     { _id: data._id }, // Find by ID
        //     { $set: data } // Use $set to update the fields
        // );
        const result = await EntityModel.findOneAndUpdate(
            { _id: data._id },
            { $set: data },
            { new: true }
        );
        if (!result) {
            throw new Error(entityName + ' not found');
        }

        return result;
    } catch (error) {
        //console.error('Error updating bookmark:', error);
        throw error;
    }
}

export const deleteEntity = async(id, entityName, optionalScheme = null) =>{



    let EntityModel;
    try {
        EntityModel = mongoose.model(entityName); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        if (optionalScheme == undefined || optionalScheme == null) {
            EntityModel = mongoose.model(entityName, new mongoose.Schema({}, {strict: false}));

        } else {
            EntityModel = mongoose.model(entityName, optionalScheme);

        }
    }
    const toDelete = await EntityModel.findById(id);
    await toDelete.deleteOne();

    // return {success: true};
}
////////////////////*******END OF GENERAL ENTITIES METHODS****////////////////////////////////////////














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
