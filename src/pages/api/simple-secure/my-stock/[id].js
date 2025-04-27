import {getBookmark} from "../../../../server/db/db-services";
import {getEntity} from "@/server/db/generic-entity-dao";
import {authorize} from "@/server/users/security-middleware";
import {getEntityPerUser} from "@/server/db/per-user-entity-dao";

export default async function handler(req, res) {

    const entityName = "myStock";

    const { id } = req.query;
    //Vice versa...
    console.log("my-stock ws")
    let user = null;
    let  item = null;
    try {
        const result = authorize(req);
        user = result;
        item = await getEntityPerUser(user.id ,entityName, id);//assuming that the model (the collection) exists

        console.log("Hi " + user.username);
    }catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message});
    }


    if (req.method === 'GET') {
        return res.status(200).json(item);//assuming that's exist
    }

    return res.status(404).end();
}
