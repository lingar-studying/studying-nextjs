import mongoose from "mongoose";
import {
    createEntityPerUser,
    deleteEntityPerUser,
    getAllEntitiesPerUser,
    updateEntityPerUser
} from "@/server/db/per-user-entity-dao";
import {getServerSession} from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]"


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
    console.log("my-stock ws with next")
    let user = null;
    // try {
    //     const result = authorize(req);
    //     user = result;
    //     console.log("Hi " + user.username);
    // }catch (error) {
    //     console.error(error);
    //     return res.status(500).json({error: error.message});
    // }

    const session = await getServerSession(req, res, authOptions)
    console.log("lingar sess", session);
    if (session) {
        // Signed in
        console.log("Session === ", JSON.stringify(session, null, 2))
        user = session.username;

    } else {
        // Not Signed in
        res.status(401)
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
