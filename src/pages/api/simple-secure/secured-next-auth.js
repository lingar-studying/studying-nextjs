import {createEntity, deleteEntity, getAllEntities, updateEntity} from "@/server/db/generic-entity-dao";
import mongoose from "mongoose";
import {authorize} from "@/server/users/security-middleware";
import {getServerSession, getSession} from "next-auth";

import {authOptions} from '../auth/[...nextauth]'

const entityName = "nextAuthItem";

//simple user
//Don't forget handler
export default async function handler(req, res) {

    console.log("nextAuthItem")
    // const session = await getSession({ req });
    const session = await getServerSession(req, res, authOptions);


    if (!session) {
        // אם לא נמצא סשן (משתמש לא מחובר), מחזירים שגיאה 401 Unauthorized
        return res.status(401).json({ error: "You must be logged in to access this resource." });
    }

    if (req.method === 'GET') {
        try {
            const data = await getAllEntities(entityName);
            console.log((entityName +"s = "), data);
            res.status(200).json(data);
        }catch (error) {

            res.status(500).json(error);
        }
    }

    if (req.method === 'POST') {

        try {
            const data =  await createEntity(req.body, entityName);

            res.status(200).json(data);
        }catch (error) {

            res.status(500).json(error);
        }

    }

    if (req.method === 'PUT') {

        const data = await updateEntity(req.body, entityName);
        try {
            await res.status(200).json(data);
        }catch (error) {

            res.status(500).json(error);
        }
    }
    if (req.method === 'DELETE') {

        const data = await deleteEntity(req.body, entityName);
        try {
            await res.status(200).json(data);
        }catch (error) {

            res.status(500).json(error);
        }
    }

}