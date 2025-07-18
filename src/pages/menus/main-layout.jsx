import React from "react";
import Link from "next/link";
import {Box} from "@mui/material";


const MainLayout = ({children})=> (<>



    <Box id = "main-menu" display={"flex"} flexDirection={"column"} component = "ul">

        <li>
            <Link href="/">Home Page</Link>
        </li>
        <li>
            <Link href="/example">Example</Link>
        </li>
        <li>
            <Link href="/draft-area">Draft-area</Link>
        </li>
        <li>
            <Link href="/bookmark-app/bookmarks-client">My Bookmarks - Only Client</Link>
        </li>
        <li>
            <Link href="/bookmark-app/bookmarks-server">My Bookmarks - with server</Link>
        </li>
        <li>
            <Link href="/bookmark-app/bookmarks-database">My Bookmarks - with Database</Link>
        </li>
        <li>
            <Link href="/dont-show-me">Don't show me</Link>
        </li>

        <li>
            <Link href="/pdf-poc">PDF POC (by Puppeteer)</Link>
        </li>
    </Box>

    <>
        <main style = {{padding: "20px"}} >
        {children}
        </main>
    </>
</>);

export default MainLayout;
