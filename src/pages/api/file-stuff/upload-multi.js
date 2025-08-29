import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import os from 'os';

export const config = {api: {bodyParser: false}};


const allowedExts = [".pdf", ".png", ".jpg"];
const allowedMimes = ["application/pdf", "image/png", "image/jpeg"];


export default function handler(req, res) {


    if (req.method !== 'POST') return res.status(405).end();

    try {
        // const uploadDir = path.join(process.cwd(), 'download', `studying-next-js-${new Date().toISOString().slice(0,10)}`);//relative to the project
        const uploadDir = path.join(os.homedir(), 'Downloads', `studying-next-js-${new Date().toISOString().slice(0, 10)}`);//of win sys

        //some conditions flags.


        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, {recursive: true});

        const form = formidable({
            multiples: true, uploadDir, keepExtensions: true,
            filename: (name, ext, part) => part.originalFilename
        });
        form.parse(req, (err, fields, files) => {


            if (err) return res.status(500).json({error: err.message});
            console.log("files & fields", files, fields);


            const flagFileType = fields.flagFileType[0] ?? null;


            // const flagFileType = null;
            //all types - not available , but for the studying we keep it open - so on default we keep it open.
            let allowedExts = [];// [".pdf", ".png", ".jpg"];
            let allowedMimes = [];// ["application/pdf", "image/png", "image/jpeg"];

            if (flagFileType) {
                if (flagFileType === 'only_images') {
                    allowedExts = [".png", ".jpg", ".jpeg"];
                    allowedMimes = ["image/png", "image/jpeg"];
                } else if (flagFileType === 'only_pdf') {
                    allowedExts = [".pdf"];
                    allowedMimes = ["application/pdf"];
                } else if (flagFileType === 'all') {
                    allowedExts = [".pdf", ".png", ".jpg"];
                    allowedMimes = ["application/pdf", "image/png", "image/jpeg"];

                }
                // allowedMimes = [];// ["application/pdf", "image/png", "image/jpeg"];
            }


            if (flagFileType) {
                files.files.forEach(f => {
                    console.log("f = ", f)

                        if (!allowedMimes.includes(f.mimetype) && !allowedExts.includes(path.extname(f.originalFilename).toLowerCase())) {
                            const str = allowedExts.reduce((acc, curr) => {
                                return acc  + curr +",";
                            },"");
                            return res.status(400).json({error: 'File type not allowed, only ' +str });


                        }
                    }
                )
            }


            if (!files?.files || files.files.length <= 0) return res.status(400).json({error: 'No file uploaded'});
            // File is already saved in uploadDir
            console.log("upload folder = ", uploadDir);
            console.log("files = ", files.files);
            res.status(200).json({
                message: 'Files uploaded', files: files.files.map(f => f.originalFilename)
            });
        });
    } catch (err) {

        return res.status(500).json({error: err.message});
    }

}
