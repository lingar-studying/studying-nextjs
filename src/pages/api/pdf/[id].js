// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import puppeteer from "puppeteer";
import fs from 'fs';
import path from 'path';
import os from 'os';



const pagesUrls = ["price-quote1", "price-quote-styled"]


export default async function handler(req, res) {


    const { id } = req.query;

    const generatePdf = async () => {

        const downloadsFolder = path.join(os.homedir(), 'Downloads');

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto('http://localhost:3000/' + pagesUrls[+id], {
            waitUntil: 'networkidle2',
        });
        await page.waitForSelector('#price-quote');
        await page.evaluate(() => {
            const menu = document.querySelector('#main-menu'); // או כל סלקטור שמתאים לתפריט
            if (menu) {
                menu.remove();
            }
        });
//main-menu
// Saves the PDF to hn.pdf.
        await page.pdf({
            path: downloadsFolder + `/YIM-Programming-file-${pagesUrls[+id]}.pdf`,
            format: 'A4',
            printBackground: true,
            // margin: {
            //     top: '20mm',
            //     bottom: '20mm',
            //     left: '20mm',
            //     right: '20mm'
            // }
        });

        await browser.close();
    }

    try{


        if (req.method === 'GET') {

            switch (id){
                case +1:

            }

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