import {Box} from "@mui/material";
import pdfPoc from "@/pages/pdf-poc";
import {useEffect, useState} from "react";
import {off} from "next/dist/client/components/react-dev-overlay/pages/bus";

const offersData = [
    {description: "איפיון המוצר", amount: 1, price: 5000},
    {description: "פיתוח דף בית + מערכת משתמשים", amount: 1, price: 10000},
    {description: "חיבור למערכת פריוריטי", amount: 1, price: 6000}
];

//TODO - in next. Actually not working easily you need to save it from the server first, and then it will generate here...
const PriceQuote1 = (props) => {

    const [offers, setOffers] = useState([]);

    useEffect(() => {
        setOffers([...offersData]);

    },[]);
    const getTotal = ()=>{

        let sum = 0;
        for(let i=0; i<offers.length; i++){
            sum += offers[i].price;
        }
        return sum;
    }
    return (


        <Box p={20} dir={"rtl"}>
            <h1>הצעת מחיר - YIM - Programming</h1>

            <ul>
                {offers.map(offer => {

                    return (
                        <li>
                            {offer.description}, {offer.price}

                        </li>
                    )
                })}


            </ul>
            {/*<img alt={"לוגו"} src={} />*/}
            <p>Total: {getTotal()} </p>

        </Box>
    )

}

export default PriceQuote1;