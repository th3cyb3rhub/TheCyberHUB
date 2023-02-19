import React, { useEffect } from "react";
import { ExpContainer, ExpIcon, ExpText } from "./ExpElemenets";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs, reset } from "../../features/blogs/blogSlice";

const Exp = () => {
    const dispatch = useDispatch();
    const { blogs } = useSelector((state) => state.blogs);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (user) {
            dispatch(getBlogs());
        }
        return () => dispatch(reset());
    }, [dispatch]);

    const userBlogs = blogs.filter((blog) => blog.username === user?.username);

    return (
        <ExpContainer>
            <ExpText> {user ? userBlogs.length * 50 : 0} </ExpText>
            <ExpIcon />
        </ExpContainer>
    );
};

export default Exp;
