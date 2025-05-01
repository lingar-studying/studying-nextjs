//U need to pass the result you have got from the
//Not working - u can take the cookie from browser console\ Application, and put the same value but it's not working.
//http://localhost:3000/api/simple-secure/nextAuth-secured
// pages/api/secure.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions);
    console.log("SESSION", session);
    console.log("COOKIES", req.cookies);

    if (!session) return res.status(401).json({ error: "Not slogged in" });

    res.json({ message: "Welcome", user: session.user });
}