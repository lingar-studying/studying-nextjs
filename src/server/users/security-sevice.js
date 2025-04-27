import bcrypt from 'bcrypt';
import {getAllEntities} from "@/server/db/generic-entity-dao";

export const encryptPassword = async (password)=>{
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;  // אם יש שגיאה, נשלול את המשך הפעולה
    }
}

export const validateUser = async (user) => {
    //... fetch user from a db etc.
    //here is the problem...
    const allUsers = await getAllEntities("encryptedUser");

    const originalUser = allUsers.find((val) => val.username === user.username);

    console.log("User found = " , originalUser);


    if (!originalUser) {
        throw new Error("User doesn't exist");
    }

    const match = await bcrypt.compare(user.password, originalUser.password);

    if(match) {
        return originalUser;
    }else{
        throw new Error("Credentials Wrong");
    }

}