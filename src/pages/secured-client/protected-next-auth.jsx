import { getSession } from "next-auth/react";
import {useEffect} from "react";
import React from "react";


//Make the code first run this
export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/api/auth/signin", // דף ההתחברות של next-auth
                permanent: false,
            },
        };
    }

    return {
        props: {
            user: session.user,
        },
    };
}

export default function ProtectedNextAuth({ user }) {

    const [stocks, setStocks] = React.useState([]);

    useEffect(async () => {



    })

    return (
        <div>
            <h1>שלום, {user.name} 👋</h1>
            <p>רק משתמשים מחוברים רואים את זה.</p>
            {/* פה אפשר להביא אייטמים או מה שתרצה */}
        </div>
    );
}