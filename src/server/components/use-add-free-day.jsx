import {useEffect, useState} from "react";

//For adding free day (You Ha'atzmaut)

const useAddFreeDay = (dates, start, end) => {

    const [freeDayList, setFreeDayList] = useState([]);
    const [updatedDates, setUpdatedDates] = useState([]);

    //on init -
    // get all freeDay at the range

    // merge it into the provided dates

    useEffect(() => {
        if (!dates || dates.length <= 0) return;

        //     https://www.hebcal.com/hebcal?v=1&cfg=json&start=2024-01-01&end=2124-01-01&yt=H&mod=on&i=on

        setAllFreeDays();



    }, [dates]);

    useEffect(() => {
        if (!dates || dates.length <= 0) return;
        mergeFreeDays();


    }, [freeDayList]);

    const setAllFreeDays = async () => {

        const response =
            await fetch(`https://www.hebcal.com/hebcal?v=1&cfg=json&start=${start}-01-01&end=${end}-01-01&yt=H&mod=on&i=on`, {})

        const data = await response.json();

        //remove not atzmatut "HaAtzma"

        const onlyFreeDays = data.items.filter(item => item.title.includes("HaAtzma"));

        setFreeDayList(onlyFreeDays);
    }

    const mergeFreeDays = () => {
        const newDates = [...dates];
        //loop over,while
        let dateIndex = 0;
        for (let i = 0; i < freeDayList.length; i++) {
            const freeDay = freeDayList[i];

            const freeDayTime = new Date(freeDay.date).getTime();
            let currentTime = new Date(newDates[dateIndex].date).getTime();
            while (freeDayTime > currentTime) {

                dateIndex++;
                currentTime = new Date(newDates[dateIndex].date).getTime();


            }

            //on this stage you should add it here...
            newDates.splice(dateIndex, 0, freeDay);


        }
     setUpdatedDates(newDates);



    }

    // useEffect(() => {
    //     if (!dates || dates.length === 0) return; // << guard
    //     const newDates = [...dates];
    //     for(let i = 0; i < newDates.length; i++){
    //         console.log(newDates[i]);
    //         if(!newDates[i].title.includes('Hashana II')){
    //
    //             const prevDay = new Date(newDates[i].date);
    //             prevDay.setDate(prevDay.getDate() - 1);
    //             const formattedDate = prevDay.getFullYear() + "-" +
    //                 String(prevDay.getMonth() + 1).padStart(2, "0") + "-" +
    //                 String(prevDay.getDate()).padStart(2, "0");
    //             const erev = {
    //                 "title": "Erev " + newDates[i].title,
    //                 "date": formattedDate,
    //                 "category": "holiday",
    //                 "subcat": "major",
    //                 "yomtov": false,
    //             };
    //             // newDates.push(erev);
    //             newDates.splice(i,0,erev);
    //             i++;
    //
    //
    //
    //             //here to change the dates directly or to make copy?
    //         }
    //
    //     }
    //     setUpdatedDates(newDates);
    //
    //
    // }, [dates]);

    return updatedDates ?? [];

}
export default useAddFreeDay;