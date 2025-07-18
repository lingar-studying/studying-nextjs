import {Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import { David_Libre } from 'next/font/google'
import Image from "next/image";
const davidFont = David_Libre({
    subsets: ['hebrew'],
    weight: "400",
})

// https://nextjs.org/docs/pages/getting-started/fonts
const offersData = [
    {description: "איפיון המוצר", amount: 1, price: 5000},
    {description: "פיתוח דף בית + מערכת משתמשים", amount: 1, price: 10000},
    {description: "חיבור למערכת פריוריטי", amount: 1, price: 6000}
];

//TODO - in next. Actually not working easily you need to save it from the server first, and then it will generate here...
const PriceQuoteStyled = (props) => {

    const [offers, setOffers] = useState([]);

    useEffect(() => {
        setOffers([...offersData]);

    }, []);
    const getTotal = () => {

        let sum = 0;
        for (let i = 0; i < offers.length; i++) {
            sum += offers[i].price;
        }
        return sum;
    }

    const rows = offers;


    return (


        <Box p={20} dir={"rtl"} >

            <Box>


            </Box>
            <h1>הצעת מחיר </h1>
            <h2> YIM Programming</h2>
            <h3 style={{float: "right"}}>float left</h3>

            <span style={{float: "left"}}>
            {/*<img src={"/shefa.jpg"} alt={"logo"}/>*/}

            <Image src={"/shefa.jpg"} alt={"logo"} width={250} height={125}/>

            </span>



            <TableContainer component={Paper} sx = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Table sx={{width: "100%" }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">תיאור הפריט:</TableCell>

                            <TableCell align="right">כמות:</TableCell>
                            <TableCell align="right">מחיר:</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offers.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >

                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                {/*<TableCell align="right">{row.protein}</TableCell>*/}
                            </TableRow>
                        ))}

                        <TableRow
                            id = "price-quote"
                            sx={
                                {
                                    '&:last-child td, &:last-child th': {border: 0},
                                    backgroundColor: '#25435d',

                                    '& td, & th': {
                                        color: 'white',
                                        fontWeight: 'bold',

                                    }


                                }
                            }
                        >

                            <TableCell align="right"></TableCell>
                            <TableCell align="right">סה"כ:</TableCell>
                            <TableCell align="right">{getTotal()}</TableCell>

                            {/*<TableCell align="right">{row.protein}</TableCell>*/}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Box component={"p"} className = {davidFont.className}>

                כמה מילים בעברית מלאכת סופר שעטנז גץ בדק חיה
                <br/>
                חיבור למערכת פריוריטי

                והכל בכתב דויד.
            </Box>


        </Box>
    );

}

export default PriceQuoteStyled;