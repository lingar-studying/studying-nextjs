// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {bookmarksMockServer} from "../../server/bookmarks/bookmarks-mock-server";

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(getBookmarks());
  }


}
const getBookmarks=()=>{

  return bookmarksMockServer;
}
