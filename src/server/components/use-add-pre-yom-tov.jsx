import {useEffect, useState} from "react";

const useAddPreYomTov = (dates) =>{

    const [updatedDates, setUpdatedDates] = useState([]);

    useEffect(() => {
        if (!dates || dates.length === 0) return; // << guard
        const newDates = [...dates];
        for(let i = 0; i < newDates.length; i++){
            console.log(newDates[i]);
            if(!newDates[i].title.includes('Hashana II')){

                const prevDay = new Date(newDates[i].date);
                prevDay.setDate(prevDay.getDate() - 1);
                const formattedDate = prevDay.getFullYear() + "-" +
                    String(prevDay.getMonth() + 1).padStart(2, "0") + "-" +
                    String(prevDay.getDate()).padStart(2, "0");
                const erev = {
                    "title": "Erev " + newDates[i].title,
                    "date": formattedDate,
                    "category": "holiday",
                    "subcat": "major",
                    "yomtov": false,
                };
                // newDates.push(erev);
                newDates.splice(i,0,erev);
                i++;



                //here to change the dates directly or to make copy?
            }

        }
        setUpdatedDates(newDates);


    }, [dates]);

    return updatedDates ?? [];

}
export default useAddPreYomTov;