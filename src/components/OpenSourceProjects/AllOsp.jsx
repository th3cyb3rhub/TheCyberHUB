import React from "react";
import { Link } from "react-router-dom";
import { Section } from "../Resources/WriteUps/WriteUpsElements";
import OspElements from "./OspElements";
import "./OpenSourceProjects.css";
import Osp from "./OspData";
import { encodeURL } from "./util";

const AllOsp = () => {
    return (
        <Section>
            <h1> Open Source Projects </h1>
            <div className="AllOsp">
                {Osp.map((Osp, id) => (
                    <Link
                        key={id}
                        className={"styles"}
                        to={{
                            pathname: `${encodeURL(Osp.title)}`,
                        }}
                    >
                        <OspElements
                            title={Osp.title}
                            author={Osp.author}
                            date={Osp.date}
                            content={Osp.content}
                            tags={Osp.tags}
                            key={Osp.id}
                        />
                    </Link>
                ))}
            </div>
        </Section>
    );
};

export default AllOsp;
