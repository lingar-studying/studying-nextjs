// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import puppeteer from "puppeteer";
import fs from 'fs';
import path from 'path';
import os from 'os';



const generatePdf = async () => {

    const downloadsFolder = path.join(os.homedir(), 'Downloads');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com', {
        waitUntil: 'networkidle2',
    });
// Saves the PDF to hn.pdf.
    await page.pdf({
        path: downloadsFolder + '/my-first-pdf.pdf',
    });

    await browser.close();
}

export default async function handler(req, res) {

    try{
        if (req.method === 'GET') {


            await generatePdf();
            res.status(200).json("succeed");
        }

        if (req.method === 'POST') {

            //res.status(200).json(data);
        }

        if (req.method === 'PUT') {


            //res.status(200).json(data);
        }
        if (req.method === 'DELETE') {

            //res.status(200).json(data);
        }
    }catch (error) {

        res.status(500).json({ error: error.message });
    }


}