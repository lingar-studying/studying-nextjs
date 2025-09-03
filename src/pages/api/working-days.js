//Don't forget handler
import {error} from "next/dist/build/output/log";
import {log} from "next/dist/server/typescript/utils";

export default async function handler(req, res) {

    if (req.method === 'POST') {

        try {
            const data = req.body;

            const allWorkingDays = generateWorkingDays(data.start, data.end, data.holidays);


            res.status(200).json(allWorkingDays);
        } catch (error) {

            res.status(500).json({error: error.message});
        }

    } else {
        return res.status(405).json(error);
    }


}

///date service

const generateWorkingDays = (startYear, endYear, holidays) => {

    let theDay = new Date(startYear, 0, 1);
    let endDay = new Date(endYear, 0, 1);

    const allWorkingDays = [];

    let holidayIdx = 0;
    let nextNotWorkingDay = new Date(holidays[holidayIdx].date);
    while (theDay.getTime() < endDay.getTime()) {

        const dayOfWeek = theDay.getDay();


        //if it's not friday or shabbat
        if (dayOfWeek !== 5 && dayOfWeek !== 6) {

            if (!(theDay.getTime() === nextNotWorkingDay.getTime())) {

                //adding if it's the same time
                allWorkingDays.push(new Date(theDay));

            }

        }

        //u need to move to the next
        if (nextNotWorkingDay.getTime() >= theDay.getTime() && holidayIdx < holidays.length-1) {
            console.log(holidays[1+holidayIdx]);
            nextNotWorkingDay = new Date(holidays[++holidayIdx].date);
        }


        theDay.setDate(theDay.getDate() + 1);
    }

    return allWorkingDays;


}