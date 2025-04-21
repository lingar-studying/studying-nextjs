import mongoose from "mongoose";
import {connectDB2} from "@/server/db/db-services";

export const getAllUsers = async () =>{

    //in each head of method.
    await connectDB2();
    let UserModel = null;
    try {
        UserModel = mongoose.model('users'); // Try to access the model
    } catch (err) {
        // If the model doesn't exist, create it
        // UserModel = mongoose.model('users', userScheme);

        console.error("why this error? " , err);
        throw err;
    }
    // console.log("data from getALlUsers = " , data);
    return UserModel.find();
}

export const getUser = async (id) =>{
    let UserModel;
    try {
        UserModel = mongoose.model('users'); // Try to access the model
    } catch (err) {

        console.error("why this error? " , err);
        throw err;
    }
    return UserModel.findById(id);
}

// const addStockToDb = new StockModel(stock);
// return  addStockToDb.save();
export const createUser = async (user) => {


    //in each head of method.
    await connectDB2();

    let UserModel;
    try {
        UserModel = mongoose.model('simpleUsers'); // Try to access the model
    } catch (err) {

        console.error("why this error? " , err);
        throw err;
    }
    const newUserItem = new UserModel(user);
    return await newUserItem.save();
}


export const updateUser = async (user) => {
    console.log("user = ", user);

    let UserModel;
    try {
        UserModel = mongoose.model('simpleUsers'); // Try to access the model
    } catch (err) {

        console.error("why this error? " , err);
        throw err;
    }

    // delete user.currentPage;//possible to pass only required update properties.
    try {
        const result = await UserModel.updateOne(
            { _id: user._id }, // Find by ID
            { $set: user } // Use $set to update the fields
        );

        if (result.nModified === 0) {
            throw new Error('User not found or no changes made');
        }

        return result;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

export const deleteUser = async(id) =>{


    console.log("id = ", id)

    let UserModel;
    try {
        UserModel = mongoose.model('simpleUsers'); // Try to access the model
    } catch (err) {

        console.error("why this error? " , err);
        throw err;
    }
    const toDelete = await UserModel.findById(id);
    await toDelete.deleteOne();

    // return {success: true};
}