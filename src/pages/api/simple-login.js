import * as cookie from "cookie";
import {getAllUsers} from "@/server/users/user-dao";
import jwt from "jsonwebtoken";


const SECRET = "some-custom-your-secret-key";


export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // const data = createUser(req.body);

            res.status(200).json(getAllUsers());
        } catch (error) {

            res.status(500).json(error);
        }
    }

    if (req.method === 'POST') {
        console.log("login user - ");

        const users = await getAllUsers();

        console.log("usrs to find: ", users    );
        const user = users
            .find(user => user.username === req.body.username && user.password === req.body.password);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

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
}


