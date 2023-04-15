import React, { useMemo } from "react";
import './style.css';
import IRegisterByDay from "../../models/RegisterModel";
import Utils from "../../utils/utils";

type Props = {
    day: IRegisterByDay,
}

export default function DayCard({day} : Props){
    const time = useMemo(() => Utils.getHoursByDay(day), [day]);

    return (
        <div className="day-card">
            <span className="day">{day.day}</span>
            <h5 className="time">{time}</h5>
        </div>
    );
}