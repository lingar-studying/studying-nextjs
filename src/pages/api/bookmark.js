// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {bookmarksMockServer} from "../../server/bookmarks/bookmarks-mock-server";
import {Bookmark} from "@mui/icons-material";

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(getBookmarks());
  }

  if (req.method === 'POST') {
    const data = createBookmarks(req.body);

    res.status(200).json(data);
  }


}
const getBookmarks=()=>{

  return bookmarksMockServer;
}


const createBookmarks=(newBookmark)=>{

  bookmarksMockServer.push(newBookmark);
  return newBookmark;
}
