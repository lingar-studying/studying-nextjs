import React, {useEffect, useState} from "react";
import {generateId} from "../../server/bookmarks/mock-data-bookmarks";
import DeleteIcon from '@mui/icons-material/Delete';

import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    FormControlLabel,
    IconButton,
    TextField,
    Typography
} from "@mui/material";
import Link from "next/dist/client/app-dir/link";

const BookmarksDatabase = () => {
    const [data, setData] = useState([]);

    const [showCreateItem, setShowCreateItem] = useState(false);

    const [dataChanged, setDataChanged] = useState(false);
    const [itemState, setItemState] = useState({
        bookName: "",
        sectionNum: 0,
        currentPage: 0,
        quote: "",
        comment: "",
        isActiveLast2Weeks: false
    });
    const [updatedId, setUpdatedId] = useState("");


    const [deletedId, setDeletedId] = useState("");

    const [dbConnected, setDbConnected] = useState(true);
    console.log("data = ", data)
    const changeItem = (ev) => {
        let {value, name} = ev.target;

        if (name === "isActiveLast2Weeks") {
            value = ev.target.checked == true;
        }
        // console.log("ev=" , ev,"\nvalue = ", value)

        setItemState((prevState => {
            return {...prevState, [name]: value};
        }));
    }


    const addBookmark = async () => {
        const temp = {...itemState};
        console.log("asdasd")

        try {
            // Perform a POST request using fetch
            const response = await fetch('/api/bookmark-db', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // specify content type
                },
                body: JSON.stringify(temp), // convert the object to JSON
            });

            setItemState({
                 id: "",
                bookName: "",
                sectionNum: 0,
                currentPage: 0,
                quote: "",
                comment: "",
                isActiveLast2Weeks: false
            });
            setDataChanged(!dataChanged);
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to send data');
            }

            // Parse the JSON response
            //const result = await response.json();


        } catch (err) {
            // Handle any error

            console.error('Error:', err);
        }


        // mockBookmarks.push(temp);


    }

    const updateBookmark = async () => {
        console.log("update booknart")
        try {
            // Perform a POST request using fetch
            const response = await fetch('/api/bookmark-db', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // specify content type
                },
                body: JSON.stringify(itemState), // convert the object to JSON
            });

            setItemState({
                id:"",
                bookName: "",
                sectionNum: 0,
                currentPage: 0,
                quote: "",
                comment: "",
                isActiveLast2Weeks: false
            });
            setDataChanged(!dataChanged);
            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to send data');
            }

            // Parse the JSON response
            //const result = await response.json();
            setUpdatedId("");


        } catch (err) {
            // Handle any error

            console.error('Error:', err);
        }


    }

    //Effects

    //on init

    useEffect(() => {

        const connectToDb = async () => {
            try {
                // Perform a POST request using fetch
                const response = await fetch('/api/connect-db', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // specify content type
                    },
                });
                if(!response.ok) throw ("avs");

                const tempResponse = await fetch("/api/bookmark-db");
                let tempData = await tempResponse.json();

                tempData = tempData.map(item=>({...item, id: item._id}));
                // console.log("temp = ", tempData)
                setData(tempData);
                console.log("COnnected from component")
            } catch (err) {
                // Handle any error

                console.error('Error on component trying to connect db:\n', err);
                setDbConnected(false);
            }
        }
        connectToDb();

    }, [dataChanged]);

    useEffect(() => {
        if (updatedId !== "") {
            let temp = data.filter(item => item._id === updatedId)[0];
            if(temp == null)return;
            console.log("temp ", temp);
            temp.isActiveLast2Weeks = temp.isActiveLast2Weeks === "true";
            setItemState(temp);
        } else {
            setItemState({
                id: "",
                bookName: "",
                sectionNum: 0,
                currentPage: 0,
                quote: "",
                comment: "",
                isActiveLast2Weeks: false
            });
        }

    }, [updatedId]);

    useEffect(() => {
        if (deletedId != "") {
            console.log("delete bookmark")
            const deleteBookmark = async () => {
                try {
                    // Perform a POST request using fetch
                    const response = await fetch('/api/bookmark-db', {
                        method: 'DELETE',
                        headers: {

                        },
                        body: deletedId, // send 'id' as a JSON string
                    });

                    // Check if the response is successful
                    if (!response.ok) {
                        throw new Error('Failed to send data');
                    }

                    // Parse the JSON response
                    const result = await response.json();

                    // Set the response data to state
                    setDataChanged(!dataChanged);

                } catch (err) {
                    // Handle any error
                    // setError(err.message);
                    console.error('Error:', err);
                } finally {
                    setDeletedId("");
                }
            }
            deleteBookmark();


        }


    }, [deletedId]);
    /*
     bookName: "Kombinatorika IV",
            sectionNum: 2,
            currentPage: 47,
            quote: "Zeruf Shel k Evarim...",
            comment: "not comment",
            isActiveLast2Weeks: false
     */
    return (
        <>
            <p>updated id = {updatedId}</p>
            <p>{dbConnected + ""}</p>
            {dbConnected != true && <p>DB isn't connected! </p>}
            <Box component={"h2"} sx={{color: "info.main"}}>Bookmarks - With
                Database</Box>
            <>
                <Button color={"primary"} variant="contained"
                        onClick={() => setShowCreateItem(!showCreateItem)}
                        disabled={updatedId != ""}>
                    {showCreateItem ? "close" : "Create new book mark"}
                </Button>
                {showCreateItem &&
                <>
                    <Box component={"div"}>
                        <h3>Create new Bookmark</h3>

                        <Box component={"div"} display={"flex"}
                             flexWrap={"wrap"}
                             margin={"auto"} justifyContent={"space-between"}
                             alignItems={"flex-start"}


                        >
                            <TextField
                                required
                                id="outlined-required"
                                label="Book Name"

                                value={itemState.bookName}
                                onChange={changeItem}
                                name="bookName"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Section Number"
                                type="number"
                                value={itemState.sectionNum}
                                onChange={changeItem}
                                name="sectionNum"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Current Page"
                                type="number"
                                value={itemState.currentPage}
                                onChange={changeItem}
                                name="currentPage"
                            />
                            <TextField

                                id="outlined-required"
                                label="Quote"

                                value={itemState.quote}
                                onChange={changeItem}
                                name="quote"
                                helperText="The Current Quote of the reader"
                            />
                            <TextField

                                id="outlined-required"
                                label="Comment"

                                value={itemState.comment}
                                onChange={changeItem}
                                name="comment"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={itemState.isActiveLast2Weeks}
                                        onChange={changeItem}
                                        name="isActiveLast2Weeks"

                                    />
                                }
                                label="Active in the last 2 weeks?"
                            />


                        </Box>
                        <Button color={"primary"} variant="contained"
                                onClick={addBookmark}>
                            Add Item
                        </Button>

                    </Box>
                </>

                }
            </>

            <h2>For testing</h2>
            {data.map((item, idx) => {
                return <p key={item.id}>#{item._id}-Book Name = {item.bookName},
                    Section {item.sectionNum},
                    page {item.currentPage},
                    {item.isActiveLast2Weeks ? "Well Done" : "Take some time for this"}
                </p>
            })}


            <h3>Items:</h3>

            <Box component={"div"} sx={{display: 'flex', flexWrap: "wrap"}}>
                {data.map((item, idx) => {
                    return <Card sx={{width: 275, margin: "15px  auto"}}
                                 key={idx + item.id}>
                            <CardContent>

                                <Link href={`/bookmark-app/${item.id}?db=true`} passHref >

                                    open in new page
                                </Link>
                                <Typography gutterBottom sx={{
                                    color: 'text.secondary',
                                    fontSize: 14
                                }}>

                                    {(updatedId === item.id) ?
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={itemState.isActiveLast2Weeks}
                                                    onChange={changeItem}
                                                    name="isActiveLast2Weeks"

                                                />
                                            }
                                            label="Active in the last 2 weeks?"
                                        />
                                        :
                                        <>{item.isActiveLast2Weeks ? "Well Done" : "Take some time for this"}</>
                                    }

                                </Typography>
                                <Typography variant="h5" component="div">

                                    {(updatedId === item.id) ?
                                        <>

                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Book Name"

                                                value={itemState.bookName}
                                                onChange={changeItem}
                                                name="bookName"
                                                sx={{marginBottom: "2em"}}
                                            />
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Section Number"
                                                type="number"
                                                value={itemState.sectionNum}
                                                onChange={changeItem}
                                                name="sectionNum"
                                                sx={{marginBottom: "2em"}}

                                            />

                                        </>


                                        : <>{item.bookName},
                                            Ch. {item.sectionNum}#</>
                                    }

                                </Typography>
                                <Typography sx={{
                                    color: 'text.secondary',
                                    mb: 1.5
                                }}>
                                    {(updatedId === item.id) ?
                                        <>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Current Page"
                                                type="number"
                                                value={itemState.currentPage}
                                                onChange={changeItem}
                                                name="currentPage"
                                                sx={{marginBottom: "2em"}}

                                            />
                                        </>
                                        :
                                        <>Page {item.currentPage}#</>}
                                </Typography>
                                <Typography variant="body2">
                                    {(updatedId === item.id) ?
                                        <>
                                            <TextField

                                                id="outlined-required"
                                                label="Quote"

                                                value={itemState.quote}
                                                onChange={changeItem}
                                                name="quote"
                                                helperText="The Current Quote of the reader"
                                            />
                                            <TextField

                                                id="outlined-required"
                                                label="Comment"

                                                value={itemState.comment}
                                                onChange={changeItem}
                                                name="comment"
                                            />
                                        </> :
                                        <>
                                            <b>Quote:</b> "{item.quote}"
                                            <br/>
                                            Comment: {item.comment}
                                        </>}

                                </Typography>
                            </CardContent>

                        <CardActions>
                            <Button size="small"
                                    onClick={() => (updatedId !== item.id ? setUpdatedId(item.id) : setUpdatedId(""))}

                            >{updatedId === item.id ? "Cancel" : "Update Bookmark"}</Button>
                            {updatedId === item.id &&
                            <Button size="small" color={"warning"}
                                    variant={"contained"}
                                    onClick={updateBookmark}

                            >Save</Button>
                            }

                            <IconButton aria-label="delete"
                                        onClick={() => setDeletedId(item.id)}>
                                <DeleteIcon/>
                            </IconButton>

                        </CardActions>
                    </Card>
                })}
            </Box>


        </>
    );
}
//do you see good now?

export default BookmarksDatabase;
