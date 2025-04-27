import {getBookmark} from "../../../server/db/db-services";
import {getEntity} from "@/server/db/generic-entity-dao";

export default async function handler(req, res) {

    const entityName = "myItem";
    const { id } = req.query;
    //Vice versa...
     const item = await getEntity( entityName, id);//assuming that the model (the collection) exists


    if (req.method === 'GET') {
        return res.status(200).json(item);
    }

    return res.status(404).end();
}
