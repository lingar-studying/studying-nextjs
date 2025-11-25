import {DragAndDropUpload, DragAndDropUploadUpgraded, MultiUpload, SingleUpload} from "@/components/file-components";
import React from "react";
import {Box} from "@mui/material";
import Image from 'next/image'

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

            <img src={`C:\\Users\\lingar\\Downloads\\studying-next-js-2025-11-25\\מצלמות עיריה.jpeg`} style={{ maxWidth: '100%' }} />
            <br/>
            <Image
                src="/shefa.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
            />

        </>
    )
}
export default FileUploadPoc;