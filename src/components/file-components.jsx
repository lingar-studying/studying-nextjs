/**
 * Some file using components
 */
import {Box, Button, Typography} from "@mui/material";
import {useState} from "react";

export const SingleUpload = (props) => {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        if (!file) return alert('Select a file');
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/file-stuff/upload-single', { method: 'POST', body: formData });
        const data = await res.json();
        alert(data.message);
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

        console.log("file = ", files);
        if (files.length ===  0) return alert('Select a file');
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);

        })

        const res = await fetch('/api/file-stuff/upload-multi', { method: 'POST', body: formData });
        const data = await res.json();
        console.log("data  = ",data )
        alert(data.message);
    };
    return (
        <Box component={"div"} {...props}>
            <Typography>Here you can upload multi</Typography>
            <input type="file" multiple={true} onChange={(e) => setFiles([...e.target.files])}/>
            <Button variant="contained" onClick={handleUpload}>Upload Files</Button>
        </Box>
    );
}