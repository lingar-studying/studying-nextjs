import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import os from 'os';

export const config = { api: { bodyParser: false } };

export default function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
   // const uploadDir = path.join(process.cwd(), 'download', `studying-next-js-${new Date().toISOString().slice(0,10)}`);//relative to the project
    const uploadDir =path.join(os.homedir(), 'Downloads', `studying-next-js-${new Date().toISOString().slice(0,10)}`);//of win sys
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const form = formidable({ multiples: false, uploadDir, keepExtensions: true,
        filename: (name, ext, part) => part.originalFilename});
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!files.file) return res.status(400).json({ error: 'No file uploaded' });
        // File is already saved in uploadDir
        console.log("upload folder = ", uploadDir);
        res.status(200).json({ message: 'File uploaded', file: files.file.originalFilename });
    });
}
