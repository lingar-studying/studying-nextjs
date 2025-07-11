import React, {useEffect} from "react";
import {Box, Button} from "@mui/material";


//POC of PDF generator
const PdfPoc = () => {


    const createPdf = async () => {

        try {
            const res = await fetch('/api/pdf/poc', {
                method: 'GET'
            });

            const problem = await res.json();

            console.log(problem);
            if (!res.ok) throw new Error(`Server error: ${problem.error}`);

            alert("The file created successfully. Check downloads folder");
        } catch (error) {
            console.log("error", error);
            alert("error- " + error);
        }

    }

    const createPdfPriceQuote = async (id) => {

        try {
            const res = await fetch('/api/pdf/' + (id-1), {
                method: 'GET'
            });

            const problem = await res.json();

            console.log(problem);
            if (!res.ok) throw new Error(`Server error: ${problem.error}`);

            alert("The file created successfully. Check downloads folder");
        } catch (error) {
            console.log("error", error);
            alert("error- " + error);
        }

    }

    useEffect(() => {

    }, []);
    return (
        <Box>

            <h1>PDF POC</h1>
            <Button color={"primary"} onClick={createPdf} variant={"contained"}>
                Create Basic PDF in downloads
            </Button>
            <br/>
            <Button color={"info"} onClick={()=>createPdfPriceQuote(1)} variant={"contained"}>
                Create type 1 PDF - "הצעת מחיר" in downloads
            </Button>
        </Box>

    )
}
export default PdfPoc;