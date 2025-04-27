import * as cookie from "cookie";
import {getAllUsers} from "@/server/users/user-dao";
import jwt from "jsonwebtoken";
import {validateUser} from "@/server/users/security-sevice";


const SECRET = "encryptedSecret";


export default async function handler(req, res) {


    if (req.method === 'POST') {
        console.log("login user - ");
    try{
        const valid = validateUser(req.body);

        if (valid) {
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
        res.status(500).json({ error: error });
    }



    }
    //any other requests
    res.status(404).end();
}


