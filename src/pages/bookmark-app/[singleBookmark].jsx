import {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import {Box, Paper, Typography} from "@mui/material";

const SingleBookmark = () => {
    const router = useRouter();
    console.log("router = ", router);

    const [bookmark, setBookmark] = useState({});
    const {singleBookmark} = router.query;
    console.log("bookmark  ", bookmark)
    useEffect(() => {
        // const tempData = mockBookmarks;
        const fetchBookmark = async () => {

            if (singleBookmark != null) {

                try {
                    //you can use here axios too.....
                    const response = await fetch('/api/bookmark/' + singleBookmark); // כתובת ה-API
                    const data = await response.json();
                    setBookmark(data); // שמירת הנתונים
                } catch (error) {
                    alert('Error fetching single bookmark'); // טיפול בשגיאות
                } finally {
                    // setLoading(false); // סיום טעינה
                }

            }
        };
        fetchBookmark();


    }, [router.query]);
    return (
        <>
            <h1>BookMark</h1>
            <p>data = {router.query.singleBookmark}</p>
            <Box display="flex" justifyContent="center" alignItems="center"
                 flexWrap="wrap" gap={2}>
                <Box width={{xs: '100%', sm: '48%', md: '30%'}}>
                    <Paper elevation={3}
                           sx={{padding: 2, backgroundColor: '#f0f8ff'}}>
                        <Typography variant="h6"
                                    sx={{fontWeight: 'bold', color: '#4caf50'}}>
                            {bookmark.bookName}
                        </Typography>
                        <Typography variant="body2" sx={{color: '#1976d2'}}>
                            <strong>Section
                                Number:</strong> {bookmark.sectionNum}
                        </Typography>
                        <Typography variant="body2" sx={{color: '#f57c00'}}>
                            <strong>Current
                                Page:</strong> {bookmark.currentPage}
                        </Typography>
                        <Typography variant="body2" sx={{color: '#9c27b0'}}>
                            <strong>Quote:</strong> "{bookmark.quote}"
                        </Typography>
                        <Typography variant="body2"
                                    sx={{color: bookmark.isActiveLast2Weeks ? '#4caf50' : '#f44336'}}>
                            <strong>Status:</strong> {bookmark.isActiveLast2Weeks ? 'Active' : 'Inactive'}
                        </Typography>
                        <Typography variant="body2" sx={{color: '#3f51b5'}}>
                            <strong>Comment:</strong> {bookmark.comment}
                        </Typography>
                    </Paper>
                </Box>
            </Box>

        </>
    );
}


export default SingleBookmark;
