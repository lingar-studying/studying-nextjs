import React from "react";
import Link from "next/link";


const MainLayout = ({children})=> (<>


    <h1>Links</h1>
    <ul>
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
    </ul>
    <>
        <main style = {{padding: "20px"}}>
        {children}
        </main>
    </>
</>);

export default MainLayout;
