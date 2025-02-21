import React, {useEffect, useState} from "react";
import {generateId, mockBookmarks} from "./mock-data-bookmarks";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography
} from "@mui/material";

const Bookmarks = (props) => {
    const [data, setData] = useState([]);

    const [showCreateItem, setShowCreateItem] = useState(false);

    const [itemState, setItemState] = useState({
        bookName: "",
        sectionNum: 0,
        currentPage: 0,
        quote: "",
        comment: "",
        isActiveLast2Weeks: false
    });
    const [updatedId, setUpdatedId] = useState(-1);

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


    useEffect(()=>{
        if(updatedId >= 0){
            const temp = mockBookmarks.filter(item=>item.id === updatedId)[0];
            setItemState(temp);
        }

    },[updatedId]);
    const addBookmark = () => {
        const temp = {...itemState, id: generateId()};
        mockBookmarks.push(temp);
        setItemState({
            id: -1,
            bookName: "",
            sectionNum: 0,
            currentPage: 0,
            quote: "",
            comment: "",
            isActiveLast2Weeks: false
        });

    }

    //Effects

    //on init
    useEffect(() => {
        const tempData = mockBookmarks;
        setData(tempData);
    }, []);

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

            <>
                <Button color={"primary"} variant="contained"
                        onClick={() => setShowCreateItem(!showCreateItem)}>
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
                return <p key={item.id}>#{item.id}-Book Name = {item.bookName},
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
                                    onClick={() => (updatedId !== item.id ? setUpdatedId(item.id) : setUpdatedId(-1))}

                            >Update Bookmark</Button>
                        </CardActions>
                    </Card>
                })}
            </Box>


        </>
    );
}

export default Bookmarks;
