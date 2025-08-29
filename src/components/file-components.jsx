/**
 * Some file using components
 */
import {Box, Button, Typography} from "@mui/material";
import {useState} from "react";

export const SingleUpload = (props) => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {

        try {
            if (!file) return alert('Select a file');
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/file-stuff/upload-single', {method: 'POST', body: formData});
            const data = await res.json();

            if (!res.ok) {
                alert(`Error: ${data.error || 'Unknown error'}`);
            } else {
                alert(data.message);
            }



        }catch (err){

            alert(`Network or parsing error: ${err.message}`);

        }
    };
    return (
        <Box component={"div"} {...props}>
            <Typography>You can upload any file</Typography>
            <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
            <Button variant="contained" onClick={handleUpload}>Upload</Button>
        </Box>
    );
}

export const MultiUpload = (props) => {
    const [files, setFiles] = useState([]);

    const handleUpload = async () => {


        try {
            console.log("file = ", files);
            if (files.length ===  0) return alert('Select a file');
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('files', file);

            })

            if(props.flagFileType) formData.append('flagFileType', props.flagFileType);

            const res = await fetch('/api/file-stuff/upload-multi', { method: 'POST', body: formData });

            const data = await res.json();


            if (!res.ok) {
                alert(`Error: ${data.error || 'Unknown error'}`);
            } else {
                console.log("data  = ",data )

                alert(data.message);
            }

        }catch (err){
            alert(`Network or parsing error: ${err.message}`);
        }

    };
    return (
        <Box component={"div"} {...props}>
            <Typography>Here you can upload multi {props.flagFileType && <b>Only for {props.flagFileType}</b>}</Typography>
            <input type="file" multiple={true} onChange={(e) => setFiles([...e.target.files])}/>
            <Button variant="contained" onClick={handleUpload}>Upload Files</Button>
        </Box>
    );
}