import {DragAndDropUpload, DragAndDropUploadUpgraded, MultiUpload, SingleUpload} from "@/components/file-components";
import React from "react";
import {Box} from "@mui/material";

const FileUploadPoc = () =>{


    return(
        <>
            <h2>Upload file stuff</h2>
            <Box component={"h2"} sx={{color: "red"}}>Pay Attnetion - the files uploaded to download folder in your PC.</Box>
            <SingleUpload/>
            <MultiUpload/>

            <MultiUpload flagFileType = {'only_images'}/>
            <MultiUpload flagFileType = {'only_pdf'}/>

            <DragAndDropUpload/>
            <DragAndDropUploadUpgraded/>

        </>
    )
}
export default FileUploadPoc;