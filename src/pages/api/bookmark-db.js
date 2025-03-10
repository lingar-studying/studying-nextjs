// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {bookmarksMockServer} from "../../server/bookmarks/bookmarks-mock-server";
import {generateId} from "@/server/bookmarks/bookmark-app/mock-data-bookmarks";
import {getAllMemoryUsageSpans} from "next/dist/lib/memory/trace";
import {createBookmark, getAllBookmarks, updateBookmark as updateBookmarkDb
, deleteBookmark} from "../../server/db/db-services";

// import {connectDB} from  '@/server/db/db-services';

//http://localhost:3000/api/bookmark-db
export default async function handler(req, res) {
  if (req.method === 'GET') {

    const data = await getAllBookmarks();
    // console.log("data - " , data);

    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const data = createBookmark(req.body);

    res.status(200).json(data);
  }

  if (req.method === 'PUT') {

    const data = updateBookmark(req.body);

    res.status(200).json(data);
  }
  if (req.method === 'DELETE') {

    console.log("req.body ", req.body)
    const data = deleteBookmark(req.body);
    res.status(200).json(data);
  }

}


//
// const createBookmarks=(newBookmark)=>{
//   newBookmark.id = generateId();
//   bookmarksMockServer.push(newBookmark);
//   return newBookmark;
// }
const updateBookmark = async (updatedBookmark)=>{

  //console.log("idx = " + idx);

  return await  updateBookmarkDb(updatedBookmark);
}
