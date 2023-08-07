import React, { useEffect } from "react";
import { BookmarksContainer } from "./BookmarksElements";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "../../../features/bookmarks/bookmarkSlice";
import FeedPosts from "../../Feeds/FeedPosts/FeedPosts";

const Bookmarks = () => {
    const dispatch = useDispatch();

    const { bookmarks } = useSelector((state) => state.bookmarks);

    useEffect(() => {
        dispatch(getBookmarks());
    }, [dispatch]);

    const feedBookmarksData = bookmarks.filter((bookmark) => bookmark.itemType === "feed");

    return (
        <BookmarksContainer>
            Bookmarks
            {bookmarks.map((bookmark) => (
                <div key={bookmark.id}>
                    {bookmark.itemType} {bookmark.itemId}
                </div>
            ))}
            <FeedPosts feedBookmarksData={feedBookmarksData} />
        </BookmarksContainer>
    );
};

export default Bookmarks;
