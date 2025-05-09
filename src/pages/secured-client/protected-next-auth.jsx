import { getSession } from "next-auth/react";
import {useEffect} from "react";
import React from "react";
import axios from "axios";
import {Button} from "@mui/material";
//url to this page:
//http://localhost:3000/secured-client/protected-next-auth

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


    // Not Working
    useEffect( () => {
    //
    //     // Make a request for a user with a given ID
    //     //  axios.get('/api/simple-secure/my-stock')//won't work in the regular authorization...
    //          //secured-next-auth.js
    //     axios.get('/api/simple-secure/secured-next-auth')
    //
    //         .then(function (response) {
    //             // handle success
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    //         .finally(function () {
    //             // always executed
    //         });
    //
    // })


    // const createThreeItems=()=>{
    //     axios.get('/api/simple-secure/next-auth-my-stock', {stock: "CA"})
    //
    //         .then(function (response) {
    //             // handle success
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             // handle error
    //             console.log(error);
    //         })
    //         .finally(function () {
    //             // always executed
    //         });

        axios.post('/api/simple-secure/next-auth-my-stock', {stock: "CA"})



            .then(function (response) {
                console.log("Trying to post too")
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    });

    return (
        <div>
            <h1>שלום, {user.name} 👋</h1>
            <p>רק משתמשים מחוברים רואים את זה.</p>

            <Button onClick={createThreeItems }>Create some </Button>
            {/* פה אפשר להביא אייטמים או מה שתרצה */}
        </div>
    );

}