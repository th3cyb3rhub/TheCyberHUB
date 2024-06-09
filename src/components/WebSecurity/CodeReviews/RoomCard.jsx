import React from "react";
import { RouterLink } from "src/components/Tools/ToolsElements";
import { RoomCardContainer, RoomTags } from "src/components/WebSecurity/Common/Labs/RoomCardElement";

export default function CodeReviewCard(props) {
    return (
        <RoomCardContainer>
            <div
                style={{
                    width: "100%",
                    height: "87px",
                    background: "#131313",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: "5px",
                }}
            >
                <div style={{ padding: "10px" }}>
                    <h1>{props.title}</h1>
                    <h2 style={{ opacity: "80%", fontSize: "14px" }}>{props.subtitle}</h2>
                </div>
                <RouterLink
                    to={`/websecurity/code-review/${props.id}`}
                    style={{
                        background: "transparent",
                        height: "100%",
                        width: "130px",
                        fontSize: "20px",
                        color: "#FF6B08",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textDecoration: "none",
                    }}
                >
                    View Code
                </RouterLink>
            </div>
            <div
                style={{
                    width: "100%",
                    height: "63px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    background: "#090909",
                }}
            >
                <div
                    style={{
                        height: "63px",
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        alignItems: "center",
                        background: "#090909",
                    }}
                >
                    {props.tags.map((data) => {
                        return <RoomTags key={data}>{data}</RoomTags>;
                    })}
                </div>

                <div
                    style={{
                        background: "#142638",
                        marginRight: "20px",
                        padding: "7px",
                        borderRadius: "5px",
                    }}
                >
                    <label style={{}}>{props.level}</label>
                </div>
            </div>
        </RoomCardContainer>
    );
}
