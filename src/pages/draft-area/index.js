import React from "react";
import {Box, Button} from "@mui/material";
import {DragAndDropUpload, DragAndDropUploadUpgraded, MultiUpload, SingleUpload} from "@/components/file-components";

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

            <h2>Upload file stuff</h2>
            <SingleUpload/>
            <MultiUpload/>

            <MultiUpload flagFileType = {'only_images'}/>
            <MultiUpload flagFileType = {'only_pdf'}/>

            <DragAndDropUpload/>
            <DragAndDropUploadUpgraded/>

        </>
    )
}
export default DraftDefault;
