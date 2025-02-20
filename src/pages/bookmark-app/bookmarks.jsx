import React, {useEffect, useState} from "react";
import {mockBookmarks} from "./mock-data-bookmarks";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography
} from "@mui/material";

const Bookmarks = (props) => {
    const [data, setData] = useState([]);


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
            isActiveLast2Weeks: false
     */
    return (
        <>

            <h2>For text</h2>
            {data.map((item, idx) => {
                return <p>Book Name = {item.bookName}, Section {item.sectionNum},
                    page {item.currentPage},
                    {item.isActiveLast2Weeks? "Well Dome": "Take some time for this"}
                </p>
            })}



            <h3>Items:</h3>

            <Box component={"div"} sx={{ display: 'flex' , flexWrap: "wrap"}}>
            {data.map((item, idx) => {
                return <Card sx={{ width: 275, margin: "15px  auto" }}>
                    <CardContent>
                        <Typography gutterBottom sx={{
                            color: 'text.secondary',
                            fontSize: 14
                        }}>
                            {item.isActiveLast2Weeks? "Well Dome": "Take some time for this"}

                        </Typography>
                        <Typography variant="h5" component="div">
                            {item.bookName}, Ch. {item.sectionNum}#
                        </Typography>
                        <Typography sx={{
                            color: 'text.secondary',
                            mb: 1.5
                        }}>

                            Page {item.currentPage}#
                        </Typography>
                        <Typography variant="body2">
                            <b>Quote:</b> {item.quote},
                            <br/>
                            Comment: {item.comment}


                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Update Bookmark</Button>
                    </CardActions>
                </Card>
            })}
            </Box>


        </>
    );
}
//do you see good now?

export default Bookmarks;
