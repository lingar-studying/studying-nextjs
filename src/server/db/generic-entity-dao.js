import mongoose from "mongoose";
import {connectDB2} from "@/server/db/db-services";
////////////////////*******END OF GENERAL ENTITIES METHODS****////////////////////////////////////////


export const getAllEntities = async (entityName, optionalScheme=null) =>{

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
    const data = await EntityModel.find();
    // console.log("data from getALlBookmarks = " , data);
    return data;
}

export const getEntity = async (entityName, id, optionalScheme = null) =>{
    await connectDB2();

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
    await connectDB2();

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
    await connectDB2();

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
//to pass: {"_id":"68093aa8cd34d55f46233c63"}
export const deleteEntity = async(id, entityName, optionalScheme = null) =>{

    await connectDB2();


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
    if (!toDelete) {
        throw new Error("Item not found or not owned by user");
    }

    await toDelete.deleteOne();
    return { success: true };
    // return {success: true};
}
////////////////////*******END OF GENERAL ENTITIES METHODS****////////////////////////////////////////


