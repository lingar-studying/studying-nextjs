import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import * as logger from "next/dist/build/output/log";

const SECRET = process.env.JWT_SECRET || "some-custom-your-secret-key"; //'mytestkey'; - won't work - the same key should come here....

export default function handler(req, res) {
    try {
        console.log("hhhh")
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.token;
        console.log("token = ", token);

        if (!token) {
            logger.error(err);

            return res.status(401).json({ error: 'Missing token' });
        }

        const user = jwt.verify(token, SECRET); // בודק חתימה
        // עכשיו user מכיל את ה-id והשם שנשמרו בטוקן

        res.status(200).json({ message: 'Welcome!', user });
    } catch (err) {
        logger.error(err);
        res.status(401).json({ error: 'Invalid or expired toksn' });
    }
}
