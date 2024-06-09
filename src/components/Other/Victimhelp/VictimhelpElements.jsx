import styled from 'styled-components';

const basicTextColor = '#ffffff'; // Set your basic text color

export const VictimHelpWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const ScamSteps = styled.div`
  margin-bottom: 20px;

  h1 {
    font-size: 28px;
    margin-bottom: 15px;
    color: ${basicTextColor};
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    color: ${basicTextColor};
  }

  ol {
    list-style-type: decimal;
    padding-left: 20px;
    margin-top: 10px;
  }

  li {
    font-size: 16px;
    margin-bottom: 10px;
    

    strong {
      font-weight: bold;
      color: ${basicTextColor};
    }
  }
`;

export const ResourcesSection = styled.div`
  h2 {
    font-size: 24px;
    margin-bottom: 15px;
    color: ${basicTextColor};
  }

  p {
    font-size: 16px;
    line-height: 1.5;
    color: ${basicTextColor};
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
    margin-top: 10px;
  }

  li {
    font-size: 16px;
    margin-bottom: 10px;

    strong {
      font-weight: bold;
      color: ${basicTextColor};
    }

    a {
      color: #007bff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
