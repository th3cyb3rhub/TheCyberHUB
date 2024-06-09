import React from "react";
import { format } from "date-fns";

import {
    AiFillClockCircleIcon,
    AiFillExclamationCircleIcon,
    DurationDisplayContainer,
    DurationRequest,
} from "./DurationDisplayElements";
import { addZeroToDateString } from "src/utils/dateTimeRelatedFunctions";

const DurationDisplay = ({ children, showDate }) => {
    const startTimeDate = new Date(children?.startTime);
    const endTimeDate = new Date(children?.endTime);

    return (
        <DurationDisplayContainer>
            <AiFillClockCircleIcon />
            {children?.startTime.split("T")[0] === children?.endTime.split("T")[0] && !showDate ? (
                <p>
                    {`${addZeroToDateString(startTimeDate.getHours())}:${addZeroToDateString(
                        startTimeDate.getMinutes(),
                    )}`}
                    {" - "}
                    {`${addZeroToDateString(endTimeDate.getHours())}:${addZeroToDateString(endTimeDate.getMinutes())}`}
                </p>
            ) : (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <div>
                        <p title="yyyy-mm-dd" style={{ textAlign: "center", fontSize: 11 }}>
                            {format(startTimeDate, "yyyy-MM-dd").replace(/-/g, "/")}
                        </p>
                        <p style={{ textAlign: "center" }}>{`${addZeroToDateString(
                            startTimeDate.getHours(),
                        )}:${addZeroToDateString(startTimeDate.getMinutes())}`}</p>
                    </div>
                    -
                    <div>
                        <p title="yyyy-mm-dd" style={{ textAlign: "center", fontSize: 11 }}>
                            {format(endTimeDate, "yyyy-MM-dd").replace(/-/g, "/")}
                        </p>
                        <p style={{ textAlign: "center" }}>{`${addZeroToDateString(
                            endTimeDate.getHours(),
                        )}:${addZeroToDateString(endTimeDate.getMinutes())}`}</p>
                    </div>
                </div>
            )}
            {children?.reschedule && (
                <DurationRequest>
                    <AiFillExclamationCircleIcon />
                </DurationRequest>
            )}
        </DurationDisplayContainer>
    );
};
export default DurationDisplay;
