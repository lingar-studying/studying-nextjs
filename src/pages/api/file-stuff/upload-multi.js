import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import os from 'os';

export const config = {api: {bodyParser: false}};


const allowedExts = [".pdf", ".png", ".jpg"];
const allowedMimes = ["application/pdf", "image/png", "image/jpeg"];


export default function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    // const uploadDir = path.join(process.cwd(), 'download', `studying-next-js-${new Date().toISOString().slice(0,10)}`);//relative to the project
    const uploadDir = path.join(os.homedir(), 'Downloads', `studying-next-js-${new Date().toISOString().slice(0, 10)}`);//of win sys


    //some conditions flags.
    const flagFileType = req.body?.flagFileType ?? null;
    //all types - not available , but for the studying we keep it open - so on default we keep it open.
    let allowedExts = [];// [".pdf", ".png", ".jpg"];
    let allowedMimes = [];// ["application/pdf", "image/png", "image/jpeg"];

    if(flagFileType){
        if(flagFileType === 'only_images'){
            allowedExts =[ ".png", ".jpg"];
            allowedMimes = [ "image/png", "image/jpeg"];
        }
        else if(flagFileType === 'only_pdf'){
            allowedExts =[".pdf"];
            allowedMimes = ["application/pdf"];
        }

        else if(flagFileType === 'all'){
            allowedExts =[".pdf", ".png", ".jpg"];
            allowedMimes = ["application/pdf", "image/png", "image/jpeg"];

        }
       // allowedMimes = [];// ["application/pdf", "image/png", "image/jpeg"];
    }




    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, {recursive: true});

    const form = formidable({
        multiples: true, uploadDir, keepExtensions: true,
        filename: (name, ext, part) => part.originalFilename
    });
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(500).json({error: err.message});
        if (!Array.isArray(files)) return res.status(400).json({error: 'No file uploaded'});
        // File is already saved in uploadDir
        console.log("upload folder = ", uploadDir);
        res.status(200).json({
            message: 'Files uploaded', files: files.file.map(f => f.originalFilename)
        });
    });
}
