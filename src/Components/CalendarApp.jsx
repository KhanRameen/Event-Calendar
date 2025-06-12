import ErrorBoundary from "../utilityComponent/ErrorBoundary"
import "./CalendarApp.css"
import React, { useState, useEffect } from "react"



const CalendarApp = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const date = new Date();

    const [currentMonth, setCurrentMonth] = useState(date.getMonth())
    const [currentDay, setCurrentDay] = useState(date.getDay()) //Sun-sat ::::: Code for mon to sun
    const [currentYear, setCurrentYear] = useState(date.getFullYear())

    const prevMonth = () => {
        setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1)
        setCurrentYear(currentMonth === 0 ? currentYear - 1 : currentYear)
    }

    const nextMonth = () => {
        setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1)
        setCurrentYear(currentMonth === 11 ? currentYear + 1 : currentYear)
    }

    const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1).getDay()
    const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate() //Gives the Last day of the Month

    return (
        <ErrorBoundary>
            <div className="calendar-app">
                <div className="calendar">
                    <h1 className="heading"> Calendar </h1>
                    <div className="navigate-date">
                        <h2 className="month">{Months[currentMonth]} </h2>
                        <h2 className="year">{currentYear}</h2>
                        <div className="buttons">
                            < i class='bxr  bx-chevron-left' onClick={prevMonth}></i>
                            < i class='bxr  bx-chevron-right' onClick={nextMonth}></i>
                        </div>
                    </div>
                    <div className="weekdays">
                        {weekdays.map((day) => (<span key={day}>{day}</span>))}
                    </div>
                    <div className="days">
                        {[...Array(firstDayOfCurrentMonth).keys()].map((_, index) => (
                            <span key={`Empty ${index}`}></span>
                        ))}

                        {[...Array(totalDaysInMonth).keys()].map(day => (<span key={day + 1}>{day + 1}</span>))}
                    </div>
                </div>
                <div className="events">
                    <div className="events-popup">
                        <div className="timeinput">
                            <div className="event-popup-time">Time</div>
                            <input type="number" name="hours" min={0} max={24} className="hours" />
                            <input type="number" name="minutes" min={0} max={60} className="minutes" />

                        </div>
                        <textarea placeholder="Event Name (Character limit: 60)" name="" id=""></textarea>
                        <button className="event-popup-button">Add Event</button>
                        <button className="close-event-popup"> < i class='bxr  bx-x'  ></i></button>
                    </div>
                    <div className="event">
                        <div className="event-date-wrapper">
                            <div className="event-date">Jun 05, 2025</div>
                            <div className="event-time">10:00 AM</div>
                        </div>
                        <div className="event-text">Meeting</div>
                        <div className="event-buttons">
                            < i class='bxr  bxs-edit-alt'></i>
                            < i class='bxr  bx-x-square'  ></i>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    )
}

export default CalendarApp
