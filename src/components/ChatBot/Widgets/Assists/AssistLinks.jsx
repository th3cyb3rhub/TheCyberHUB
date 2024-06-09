import React from "react";
import { AssistLinksData } from "./AssistLinksData";

import { LinkList } from "./AssistElements";

export default function AssistLinks(props) {
    const linkMarkup = AssistLinksData.map((data) => {
        return data.name === props.optionName
            ? data.linkOptions.map((link) => (
                  <li key={link.id}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.text}
                      </a>
                  </li>
              ))
            : "";
    });

    return (
        <LinkList>
            {linkMarkup.map((item, id) => (
                <div key={id}> {item} </div>
            ))}
        </LinkList>
    );
}
