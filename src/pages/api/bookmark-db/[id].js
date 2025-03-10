import {getBookmark} from "../../../server/db/db-services";

export default async function handler(req, res) {
    const { id } = req.query;
     const item = await getBookmark(id);


    if (req.method === 'GET') {
        res.status(200).json(item);
    }
}
