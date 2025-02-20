import React from "react";
import {Box, Button} from "@mui/material";

// export default function Draft (){
// }

const DraftDefault = () => {

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

        </>
    )
}
export default DraftDefault;
