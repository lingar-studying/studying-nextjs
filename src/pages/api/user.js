import {createUser, deleteUser, getAllUsers, updateUser} from "@/server/users/user-dao";

//simple user
//Don't forget handler
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const data = createUser(req.body);

            res.status(200).json(getAllUsers());
        }catch (error) {

            res.status(500).json(error);
        }
    }

    if (req.method === 'POST') {
        console.log("hhh")
        try {
            const data =  await createUser(req.body);

            res.status(200).json(data);
        }catch (error) {

            res.status(500).json(error);
        }

    }

    if (req.method === 'PUT') {

        const data = updateUser(req.body);

        res.status(200).json(data);
    }
    if (req.method === 'DELETE') {

        const data = deleteUser(req.body);
        res.status(200).json(data);
    }

}