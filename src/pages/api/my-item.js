import {createUser, deleteUser, getAllUsers, updateUser} from "@/server/users/user-dao";
import {createEntity, deleteEntity, getAllEntities, updateEntity} from "@/server/db/generic-entity-dao";
import mongoose from "mongoose";

const entityName = "myItem";
const itemSchema = mongoose.Schema({

    description:{
        type: String,
        required: true,
        unique: true

    },
    name:{
        type: String,
        required: true,
        unique: true

    },
    price:{
        type: Number,
        required: false
    },
    done: Boolean
    // userOwner:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     unique: false
    //
    // },



})
//simple user
//Don't forget handler
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const data = await getAllEntities(entityName, itemSchema);
            console.log((entityName +"s = "), data);
            res.status(200).json(data);
        }catch (error) {

            res.status(500).json(error);
        }
    }

    if (req.method === 'POST') {

        try {
            const data =  await createEntity(req.body, entityName, itemSchema);

            res.status(200).json(data);
        }catch (error) {

            res.status(500).json(error);
        }

    }

    if (req.method === 'PUT') {

        const data = await updateEntity(req.body, entityName, itemSchema);
        try {
            await res.status(200).json(data);
        }catch (error) {

            res.status(500).json(error);
        }
    }
    if (req.method === 'DELETE') {

        const data = await deleteEntity(req.body, entityName, itemSchema);
        try {
            await res.status(200).json(data);
        }catch (error) {

            res.status(500).json(error);
        }
    }

}