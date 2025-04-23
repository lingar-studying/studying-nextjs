import * as cookie from "cookie";
import * as logger from "next/dist/build/output/log";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "some-custom-your-secret-key"; //'mytestkey'; - won't work - the same key should come here....


export const authorize = (req) => {

    try {

        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.token;
        console.log("authorize token = ", token);

        if (!token) {
            //logger.error(err);

           throw  new Error('Missing token');
        }

        const user = jwt.verify(token, SECRET); // בודק חתימה
        // עכשיו user מכיל את ה-id והשם שנשמרו בטוקן

        return user;
    } catch
        (err) {
        logger.error(err);
        throw  new Error('Invalid or expired token');
    }


}