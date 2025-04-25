import {createUser, deleteUser, getAllUsers, updateUser} from "@/server/users/user-dao";
import {createEntity, deleteEntity, getAllEntities, updateEntity} from "@/server/db/generic-entity-dao";
import mongoose from "mongoose";
import {authorize} from "@/server/users/security-middleware";
import {
    createEntityPerUser,
    deleteEntityPerUser,
    getAllEntitiesPerUser,
    updateEntityPerUser
} from "@/server/db/per-user-entity-dao";

const entityName = "myStock";
const stockSchema = mongoose.Schema({

    symbol:{
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
    userOwner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: false

    }



})
//simple user
//Don't forget handler
export default async function handler(req, res) {
    console.log("sdsds")
    let user = null;
    try {
        const result = authorize(req);
        user = result;
        console.log("Hi " + user.username);
    }catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message});
    }



    if (req.method === 'GET') {
        try {
            const data = await getAllEntitiesPerUser(user.id, entityName, stockSchema);
            console.log((entityName +"s = "), data);
            return res.status(200).json(data);
        }catch (error) {

            return res.status(500).json(error);
        }
    }

    if (req.method === 'POST') {

        try {
            const data =  await createEntityPerUser(user.id ,req.body, entityName, stockSchema);

            return res.status(200).json(data);
        }catch (error) {

            return res.status(500).json(error);
        }

    }

    if (req.method === 'PUT') {

        const data = await updateEntityPerUser(user.id, req.body, entityName, stockSchema);
        try {
            await res.status(200).json(data);
        }catch (error) {
            console.log("sasss")
            return res.status(500).json({e: "error"});
        }
    }
    if (req.method === 'DELETE') {

        const data = await deleteEntityPerUser(user.id, req.body, entityName, stockSchema);
        try {
            return  res.status(200).json(data);
        }catch (error) {

            // res.status(500).json(error);
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

}