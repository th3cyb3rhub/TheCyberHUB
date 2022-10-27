import React from "react";
import { useParams } from "react-router-dom";
import { Section } from "../Resources/WriteUps/WriteUpsElements";
import "./OpenSourceProjects.css";

import Osp from "./OspData";
import { encodeURL } from "./util";

const ViewOsp = (props) => {
    const { title } = useParams();
    let searchedOsp = Osp.find((Osp) => encodeURL(Osp.title).toLowerCase() === title.toLowerCase());
    return (
        <Section>
            <div className="viewOsp">
                <h1>{searchedOsp.title}</h1>
                <p>{searchedOsp.content}</p>
            </div>
            <div className="tags">
                {searchedOsp.tags.map((tag, index) => (
                    <div className="tag" key={index}>
                        {tag}
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default ViewOsp;
