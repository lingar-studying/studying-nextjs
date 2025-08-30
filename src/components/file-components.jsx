/**
 * Some file using components
 */
import {Box, Button, IconButton, Typography} from "@mui/material";
import {useRef, useState} from "react";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

export const SingleUpload = (props) => {
    const [file, setFile] = useState(null);

    const filesInputRef = useRef(null);

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
                // reset file + input
                setFile(null);
                if (filesInputRef.current) filesInputRef.current.value = "";
            }


        } catch (err) {

            alert(`Network or parsing error: ${err.message}`);

        }
    };
    return (
        <Box component={"div"} {...props}>
            <Typography>You can upload any file</Typography>
            <input type="file" onChange={(e) => setFile(e.target.files[0])}
                   ref={filesInputRef}

            />
            <Button variant="contained" onClick={handleUpload}>Upload</Button>
        </Box>
    );
}
/*********------------------------------------------------------------*/



export const MultiUpload = (props) => {
    const [files, setFiles] = useState([]);
    const filesInputRef = useRef(null);


    const handleUpload = async () => {


        try {
            console.log("file = ", files);
            if (files.length === 0) return alert('Select a file');
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('files', file);

            })

            if (props.flagFileType) formData.append('flagFileType', props.flagFileType);

            const res = await fetch('/api/file-stuff/upload-multi', {method: 'POST', body: formData});

            const data = await res.json();


            if (!res.ok) {
                alert(`Error: ${data.error || 'Unknown error'}`);
            } else {
                console.log("data  = ", data)

                alert(data.message);
                // reset file + input
                setFiles([]);
                if (filesInputRef.current) filesInputRef.current.value = "";
            }

        } catch (err) {
            alert(`Network or parsing error: ${err.message}`);
        }

    };
    return (
        <Box component={"div"} {...props}>
            <Typography>Here you can upload multi {props.flagFileType &&
                <b>Only for {props.flagFileType}</b>}</Typography>
            <input type="file" multiple={true} onChange={(e) => setFiles([...e.target.files])}
                   ref={filesInputRef}

            />
            <Button variant="contained" onClick={handleUpload}>Upload Files</Button>
        </Box>
    );
}

export const DragAndDropUpload = (props) => {
    const [files, setFiles] = useState([]);
    const filesInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);   // 🟢 added


    const handleFiles = (newFiles) => setFiles([...newFiles]); // 🟢 added

    const handleDrop = (e) => {                                // 🟢 added
        e.preventDefault();
        setIsDragging(false);                                   // 🟢 added
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);                 // 🟢 added
            e.dataTransfer.clearData();                        // 🟢 added
        }
    };

    const handleDragOver = (e) => {                             // 🟢 added
        e.preventDefault();
        setIsDragging(true);                                    // 🟢 added
    };

    const handleDragLeave = () => setIsDragging(false);         // 🟢 added



    const handleUpload = async () => {


        try {
            console.log("file = ", files);
            if (files.length === 0) return alert('Select a file');
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('files', file);

            })

            if (props.flagFileType) formData.append('flagFileType', props.flagFileType);

            const res = await fetch('/api/file-stuff/upload-multi', {method: 'POST', body: formData});

            const data = await res.json();


            if (!res.ok) {
                alert(`Error: ${data.error || 'Unknown error'}`);
            } else {
                console.log("data  = ", data)

                alert(data.message);
                // reset file + input
                setFiles([]);
                if (filesInputRef.current) filesInputRef.current.value = "";
            }

        } catch (err) {
            alert(`Network or parsing error: ${err.message}`);
        }

    };
    return (
        <Box
            component={"div"}
            {...props}
            onDrop={handleDrop}                     // 🟢 added
            onDragOver={handleDragOver}             // 🟢 added
            onDragLeave={handleDragLeave}           // 🟢 added
            onClick={() => filesInputRef.current?.click()} // 🟢 added
            sx={{                                    // 🟢 added
                border: "2px dashed gray",
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: isDragging ? "#e3f2fd" : "#fafafa", // 🟢 added
                transition: "background-color 0.2s",         // 🟢 added
            }}
        >
            <Typography>Nice UI - Here you can upload multi {props.flagFileType &&
                <b>Only for {props.flagFileType}</b>}</Typography>
            <input type="file" multiple={true} onChange={(e) => handleFiles(e.target.files)}
                   ref={filesInputRef}
                   style={{ display: "none" }}               // 🟢 added
            />
            {files.length > 0 && (                            // 🟢 added
                <Box mt={2}>
                    <Typography>Selected files:</Typography>
                    <ul>
                        {[...files].map((f) => (
                            <li key={f.name}>{f.name}</li>
                        ))}
                    </ul>
                </Box>
            )}
            <Button variant="contained" onClick={handleUpload}>Upload Files</Button>
        </Box>
    );
}


export const DragAndDropUploadUpgraded = (props) => {
    const [files, setFiles] = useState([]);
    const filesInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);   // 🟢 added
    const [uploadedFiles, setUploadedFiles] = useState([]); // 🟢 added: track already uploaded files



    const handleFiles = (newFiles) => {
        const newUnique = [...newFiles].filter(f => !files.some(old => old.name === f.name)); // 🟢 added: avoid duplicates
        setFiles(prev => [...prev, ...newUnique]); // 🟢 added: append new files
    };
    const removeFile = (name) => setFiles(files.filter(f => f.name !== name)); // 🟢 added: remove file by X

    const handleDrop = (e) => {                                // 🟢 added
        e.preventDefault();
        setIsDragging(false);                                   // 🟢 added
        if (e.dataTransfer.files && e.dataTransfer.files.length) {
            handleFiles(e.dataTransfer.files);                 // 🟢 added
            e.dataTransfer.clearData();                        // 🟢 added
        }
    };

    const handleDragOver = (e) => {                             // 🟢 added
        e.preventDefault();
        setIsDragging(true);                                    // 🟢 added
    };

    const handleDragLeave = () => setIsDragging(false);         // 🟢 added



    const handleUpload = async () => {


        try {
            console.log("file = ", files);
            if (files.length === 0) return alert('Select a file');
            const formData = new FormData();
            files.forEach((file) => {
                formData.append('files', file);

            })

            if (props.flagFileType) formData.append('flagFileType', props.flagFileType);

            const res = await fetch('/api/file-stuff/upload-multi', {method: 'POST', body: formData});

            const data = await res.json();


            if (res.ok) {
                alert(data.message);
                setUploadedFiles(prev => [...prev, ...files.map(f => f.name)]); // 🟢 added: track uploaded files
                setFiles([]);
                if (filesInputRef.current) filesInputRef.current.value = "";
            }

        } catch (err) {
            alert(`Network or parsing error: ${err.message}`);
        }

    };
    return (
        <Box
            component={"div"}
            {...props}
            onDrop={handleDrop}                     // 🟢 added
            onDragOver={handleDragOver}             // 🟢 added
            onDragLeave={handleDragLeave}           // 🟢 added
            onClick={() => filesInputRef.current?.click()} // 🟢 added
            sx={{                                    // 🟢 added
                border: "2px dashed gray",
                borderRadius: 2,
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: isDragging ? "#e3f2fd" : "#fafafa", // 🟢 added
                transition: "background-color 0.2s",         // 🟢 added
            }}
        >
            <Typography>Nice UI - Here you can upload multi {props.flagFileType &&
                <b>Only for {props.flagFileType}</b>}</Typography>
            <input type="file" multiple={true} onChange={(e) => handleFiles(e.target.files)}
                   ref={filesInputRef}
                   style={{ display: "none" }}               // 🟢 added
            />
            {files.length > 0 && (                            // 🟢 added
                <Box mt={2}>
                    <Typography>Selected files:</Typography>
                    <ul>
                        {[...files].map((f) => (
                            <li key={f.name} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                {f.name}
                                <IconButton size="small" onClick={() => removeFile(f.name)}>
                                    <CloseIcon fontSize="small"/>
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
            {uploadedFiles.length > 0 && ( // 🟢 added: show already uploaded files
                <Box mt={2}>
                    <Typography>Already uploaded:</Typography>
                    <ul>
                        {uploadedFiles.map(name => <li key={name}>{name}</li>)}
                    </ul>
                </Box>
            )}
            <Button variant="contained" onClick={handleUpload}>Upload Files</Button>
        </Box>
    );
}
