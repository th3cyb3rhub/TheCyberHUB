import React from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

export default function SideDropdown(props) {
  const prepList = [
    {title: "Interview Questions", url: '/prep/interviewQuestions'},
    {title: "Interview Experiences", url: '/prep/interviewExperiences'},
    {title: "Quiz", url: '/prep/quiz'},
    {title: "Jobs", url: '/prep/jobs'},
  ]

  const Item = styled.ul`
    height: 32px; 
    &:hover {
      cursor : pointer;
    }
  `

  const mobStyle = {width: '100%', padding: 6, border:'1px solid green', color:'white' };
  const dStyle = {width: 200, padding: 6, border:'1px solid green', color:'white', position: 'absolute', left: 132, top: -6 };

  return (
    <div style={props.sidebar ? mobStyle : dStyle}>
        <li>
            {
                prepList.map(i => (
                  <Item>
                    <Link style={{textDecoration: 'none', color:'white' }} to={i.url}> {i.title} </Link >
                  </Item>
                ))
            }
        </li>
    </div>
  )
};
