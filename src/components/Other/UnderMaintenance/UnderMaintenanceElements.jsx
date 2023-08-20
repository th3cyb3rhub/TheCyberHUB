import styled from "styled-components";

export const UnderMaintenanceContainer = styled.div`
    color: #e8e6e3;
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-top: 100px;
    margin-bottom: 150px;

    position: relative;
    animation: logo-animation 1s ease-in-out infinite alternate;
    transition: transform 10s ease-in-out;

    @keyframes logo-animation {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-10px);
        }
    }
`;

export const UnderMaintenanceLogo = styled.img`
    width: 500px;
    height: 500px;
    font-size: 12px;
    color: #999;
    word-break: break-all;
    //border-radius: 5px;
    //position: relative;
    //animation: logo-animation 1s ease-in-out infinite alternate;
    //transition: transform 10s ease-in-out;
    //
    //@keyframes logo-animation {
    //  0% {
    //    transform: translateY(0);
    //  }
    //  100% {
    //    transform: translateY(-10px);
    //  }
    //}
`;
