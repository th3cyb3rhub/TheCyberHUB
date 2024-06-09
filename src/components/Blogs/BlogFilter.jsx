import React from "react";

import { Option, Select } from "src/components/Blogs/BlogsElements";

const BlogFilter = ({ selectedBlogs, handleSelectedBlogs }) => {
    return (
        <div className="flex clex-col w-full justify-end align-center mb-3">
            <p className="mt-1.5 mr-1.5">Filter</p>
            <Select value={selectedBlogs} onChange={handleSelectedBlogs}>
                <Option value="all"> All </Option>
                <Option value="following"> Following </Option>
            </Select>
        </div>
    );
};

export default BlogFilter;
