import * as cookie from "cookie";
import jwt from "jsonwebtoken";
import {validateUser} from "@/server/users/security-sevice";


const SECRET = "encryptedSecret";


export default async function handler(req, res) {


    if (req.method === 'POST') {
        console.log("login user - ");
    try{
        const user =  await validateUser(req.body);
        //should catch if
        if (user) {
            const token = jwt.sign({ id: user.id, username: user.username }, SECRET, {
                expiresIn: "1h",
            });

            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                    httpOnly: true,
                    sameSite: "strict",
                    path: "/",
                    maxAge: 3600,
                })
            );
            res.status(200).json({ message: "Logged in" });
        }


    }catch (error) {

        console.log(error, "on login..." );
        res.status(500).json({ error: error });
    }



    }
    //any other requests
    res.status(404).end();
}


