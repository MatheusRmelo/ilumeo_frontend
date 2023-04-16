import React, { useMemo } from "react";
import './style.css';
import IRegisterByDay from "../../models/RegisterModel";
import RegisterController from "../../controllers/RegisterController";

type Props = {
    day: IRegisterByDay,
}

export default function DayCard({day} : Props){
    const controller = new RegisterController();
    const time = useMemo(() => controller.getHoursByDay(day), [day]);

    return (
        <div className="day-card">
            <span className="day">{day.day}</span>
            <h5 className="time">{time}</h5>
        </div>
    );
}