import {bookmarksMockServer} from "../../../server/bookmarks/bookmarks-mock-server";

export default function handler(req, res) {
    const { id } = req.query;
    const item = bookmarksMockServer.filter(item=> item.id === +id)[0];


    if (req.method === 'GET') {
        res.status(200).json(item);
    }
}
