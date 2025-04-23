import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const SECRET = process.env.JWT_SECRET || "some-custom-your-secret-key"; //'mytestkey'; - won't work - the same key should come here....

export default function handler(req, res) {
    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.token;

        if (!token) {
            return res.status(401).json({ error: 'Missing token' });
        }

        const user = jwt.verify(token, SECRET); // בודק חתימה
        // עכשיו user מכיל את ה-id והשם שנשמרו בטוקן

        res.status(200).json({ message: 'Welcome!', user });
    } catch (err) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
}
