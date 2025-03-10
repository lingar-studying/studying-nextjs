import {
    generateId,
    mockBookmarks
} from "@/server/bookmarks/bookmark-app/mock-data-bookmarks";

export let bookmarksMockServer = [...mockBookmarks];
bookmarksMockServer.push({
                id: generateId(),
                bookName: "Sidur",
                sectionNum: 10,
                currentPage: 27,
                quote: "Modeh Ani",
                isActiveLast2Weeks: true,
                comment: "Clean the Heart"

})
