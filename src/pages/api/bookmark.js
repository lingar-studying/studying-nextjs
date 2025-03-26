// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {bookmarksMockServer} from "../../server/bookmarks/bookmarks-mock-server";
import {Bookmark} from "@mui/icons-material";
import {generateId, mockBookmarks} from "../../server/bookmarks/mock-data-bookmarks";

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(getBookmarks());
  }

  if (req.method === 'POST') {
    const data = createBookmarks(req.body);

    res.status(200).json(data);
  }

  if (req.method === 'PUT') {

    const data = updateBookmark(req.body);

    res.status(200).json(data);
  }
  if (req.method === 'DELETE') {

    const data = deleteBookmark(req.body);
    res.status(200).json(data);
  }

}
const getBookmarks=()=>{

  return bookmarksMockServer;
}


const createBookmarks=(newBookmark)=>{
  newBookmark.id = generateId();
  bookmarksMockServer.push(newBookmark);
  return newBookmark;
}
const updateBookmark = (updatedBookmark)=>{
  const idx = bookmarksMockServer.findIndex(item=> item.id === updatedBookmark.id);
  bookmarksMockServer[idx] = updatedBookmark;
  //console.log("idx = " + idx);

  return updatedBookmark;
}
const deleteBookmark = (id) =>{



  const idx = bookmarksMockServer.findIndex(item=> item.id === +id);//U need to convert to number since it's came as string.
  console.log("idx (see on node teminal)= " + idx)

  bookmarksMockServer.splice(idx, 1);

  return true;
}
