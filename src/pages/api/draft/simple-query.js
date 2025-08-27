import {createEntity} from "@/server/db/generic-entity-dao";
import {CarScheme} from "@/server/db/all-schemes";

export default async function handler(req, res) {





    if (req.method === 'GET') {





        // res.status(200).json(getBookmarks());
    }

    if (req.method === 'POST') {
        //data, entityName, optionalScheme

        try{
            const reqData = req.body;
            console.log("reqData", reqData, CarScheme);
            const data = await createEntity(reqData, "cars2", CarScheme);

            return res.status(200).json(data);
        }catch (err){

            return res.status(500).json({error: err.message});
        }

    }

    if (req.method === 'PUT') {

        // const data = updateBookmark(req.body);

        // res.status(200).json(data);
    }
    if (req.method === 'DELETE') {

        // const data = deleteBookmark(req.body);
        // res.status(200).json(data);
    }

}