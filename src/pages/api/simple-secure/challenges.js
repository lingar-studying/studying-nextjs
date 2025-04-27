import {createEntity, deleteEntity, getAllEntities, updateEntity} from "@/server/db/generic-entity-dao";
import mongoose from "mongoose";
import {authorize} from "@/server/users/security-middleware";

const entityName = "challenges";
const itemSchema = mongoose.Schema({

    description:{
        type: String,
        required: true,
        unique: false

    },
    name:{
        type: String,
        required: true

    },
    days: {
        type: Number,
        required: true
    },
    done: [Boolean]

});
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