import React, {useEffect} from "react";
import puppeteer from 'puppeteer';




//POC of PDF generator
const PdfPoc = () =>{


    const generatePdf = async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://news.ycombinator.com', {
            waitUntil: 'networkidle2',
        });
// Saves the PDF to hn.pdf.
        await page.pdf({
            path: 'hn.pdf',
        });

        await browser.close();
    }

    useEffect(() => {
        generatePdf();
    }, []);
    return(
        <h1>PDF POC</h1>
    )
}
export default PdfPoc;