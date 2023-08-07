import { useSelector, useDispatch } from "react-redux";
import { addBookmark, removeBookmark } from "./bookmarkSlice";

const useBookmark = ({ itemId }) => {
    const dispatch = useDispatch();
    const bookmarks = useSelector((state) => state.bookmarks);
    const isBookmarked = bookmarks.includes(itemId);

    const handleBookmark = () => {
        if (isBookmarked) {
            dispatch(removeBookmark({ itemId }));
        } else {
            dispatch(addBookmark({ itemId }));
        }
    };

    return { isBookmarked, handleBookmark };
};

export default useBookmark;
