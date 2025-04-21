

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(getUsers());
    }

    if (req.method === 'POST') {
        const data = createUser(req.body);

        res.status(200).json(data);
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