let globalId = 0;

export const generateId =()=> globalId++;


export const mockBookmarks = [
    {
        id: generateId(),
        bookName: "Nedarim",
        sectionNum: 2,
        currentPage: 21,
        quote: "Nadar Baherem Ve'Amar...",
        isActiveLast2Weeks: true,
        comment: "No comment"


    },
    {
        id: generateId(),
        bookName: "Likutey Moharan Tinyana",
        sectionNum: 47,
        currentPage: 27,
        quote: "Gedola Lomar Torah",
        isActiveLast2Weeks: true,
        comment: "No comment"

    },
    {
        id: generateId(),
        bookName: "Kombinatorika IV",
        sectionNum: 2,
        currentPage: 47,
        quote: "Zeruf Shel k Evarim...",
        isActiveLast2Weeks: false,
        comment: "No comment"
    }];
/*
bookName – string,
currentPage – number,
quote – string// the accurate place that the reader stand.
SectionNum,
Comment,
isActiveLastTwoWeeks.

 */
