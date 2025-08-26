import React, {useEffect} from "react";
import {Box, Button} from "@mui/material";
import WorkdaysIsraelJourney from "@/server/components/workdays-israel-journey";

// export default function Draft (){
// }

const DraftDefault = () => {
    useEffect(() => {





        // fetch('https://hebcal.com/holidays?year=2023')
        //     .then(response => response.json())
        //     .then(data => console.log('dates =' ,data));
        // fetch('https://www.hebcal.com/converter?gd=2022-5-1')
        //     .then(response => response.json())
        //     .then(data => console.log(data));

        //
        // const apiKey = "7163047c-1bb0-42a8-8503-352739e3b1dc";
        // const country = "IL";
        // const year = 2024;//2025 - et::ERR_FAILED 402 (Payment Required)
        //
        // const url = new URL("https://holidayapi.com/v1/holidays");
        // url.searchParams.append("country", country);
        // url.searchParams.append("year", year);
        // url.searchParams.append("pretty", "");
        // url.searchParams.append("key", apiKey);
        // url.searchParams.append("public", true);
        //
        // fetch(url)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error(`HTTP error! status: ${response.status}`);
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         console.log("חגים בישראל לשנת 2025:", data);
        //     })
        //     .catch(error => {
        //         console.error("שגיאה ב-fetch:", error);
        //     });
    }, []);
    return (
        <>
            <h1>Hi I am draft Default</h1>
            <Button variant="contained" color="secondary">
                Go to Shop
            </Button>

            <Button variant="contained" color="primary">
                Go to Shop - primary
            </Button>
            <Box>Mui Environment</Box>


            <WorkdaysIsraelJourney/>

        </>
    )
}
export default DraftDefault;
