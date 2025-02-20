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
    </ul>
    <>
        {children}
    </>
</>);

export default MainLayout;
