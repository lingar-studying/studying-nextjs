import {createUser, deleteUser, getAllUsers, updateUser} from "@/server/users/user-dao";
import {createEntity, deleteEntity, getAllEntities, updateEntity} from "@/server/db/generic-entity-dao";
import mongoose from "mongoose";
import {encryptedUserScheme} from "@/server/users/encrypted-user-scheme";
import {encryptPassword} from "@/server/users/security-sevice";

const entityName = "encryptedUser";
const itemSchema = mongoose.Schema(encryptedUserScheme)
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


        
console.log("User = " , req.body);
        

        try {
            //Why this come undefined? -->SOLVED - the problem was at postman. Need contentType: application/json
            const encryptedPassword = await encryptPassword(req.body.password);
            const newData = {...req.body, password: encryptedPassword};
            const data =  await createEntity(newData, entityName, itemSchema);

            res.status(200).json(data);
        }catch (error) {
            //Now antoher error so I debug here
            return res.status(500).json({error:error.message});
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