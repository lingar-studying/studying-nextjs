import {getBookmark} from "../../../server/db/db-services";
import {getEntity} from "@/server/db/generic-entity-dao";

export default async function handler(req, res) {

    const entityName = "myItem";
    const { id } = req.query;
     const item = await getEntity(id, entityName);//assuming that the model (the collection) exists


    if (req.method === 'GET') {
        res.status(200).json(item);
    }
}
