import React from "react";
import './style.css';
import IRegisterByDay from "../../models/RegisterModel";
import Utils from "../../utils/utils";

type Props = {
    day: IRegisterByDay,
}

export default function DayCard({day} : Props){
    return (
        <div className="day-card">
            <span className="day">{day.day}</span>
            <h5 className="time">{Utils.differenceHoursBetweenDates(day.registers.map((element)=>new Date(element.register_at)))}</h5>
        </div>
    );
}