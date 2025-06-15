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

    const [selectedDate, setSelectedDate] = useState(date)
    const [showEventPopup, setShowEventPopup] = useState(false)

    const [events, setEvents] = useState([])
    const [eventText, setEventText] = useState("");
    const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" })

    const [editingEvent, setEditingEvent] = useState(null)

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

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()
        )
    }

    const handleDayClick = (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day)
        const dateToday = new Date()

        if (clickedDate >= dateToday || isSameDay(clickedDate, dateToday)
        ) {
            setSelectedDate(clickedDate)
            setShowEventPopup(true)
            setEventText("");
            setEventTime({ hours: "00", minutes: "00" })
            setEditingEvent(null)
        }
    }

    const handleEventSubmit = () => {

        const newEvent = {
            id: editingEvent != null ? editingEvent.id : Date.now(),    //ID of the existing event stays preserved or a new TimeStamp ID is created {this is for making sure the corrent event is being edited}
            date: selectedDate,
            time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(2, "0")}`,
            text: eventText
        }
        let updatedEvent = [...events]

        if (editingEvent) {
            updatedEvent = updatedEvent.map(event => (
                event.id === editingEvent.id ? newEvent : event //if the event id matched the id of the one we are editting then create the new event and replace it with the old even else just keeep the previous event 
            ))
        }
        else {
            //if we are not edditing the event then we are creating a new event that should be appended at the last
            updatedEvent.push(newEvent)
        }

        //Sort all the events by Date

        updatedEvent.sort((a, b) => (new Date(a.date) - new Date(b.date))) //for every the event in the array checks if the event is larger equals or smaller and sorts it accordingly
        // updatedEvent.sort((a, b) => (a.time - b.time))


        setEvents(updatedEvent)
        setEventTime({ hours: "00", minutes: "00" })
        setEventText("")
        setShowEventPopup(false)
        setEditingEvent(null)
    }

    const handleEditEvent = (event) => {
        setSelectedDate(new Date(event.date)) //converts the event.date to actual date object since we stored it as string 
        setEventTime({ hours: event.time.split(":")[0].replace(" ", ""), minutes: event.time.split(":")[1].replace(" ", ""), })
        setEventText(event.text)
        setEditingEvent(event)//takes the event we chose for edditing as object
        setShowEventPopup(true)
    }

    const handleDeleteEvent = (toDelete) => {
        const updatedEvents = events.filter((event) => (event.id !== toDelete.id))
        setEvents(updatedEvents)
    }


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

                        {[...Array(totalDaysInMonth).keys()].map(day => (<span key={day + 1} className={day + 1 == date.getDate() && currentMonth == date.getMonth() && currentYear == date.getFullYear() ? "current-day" : ""} onClick={() => (handleDayClick(day + 1))}>{day + 1}</span>))}
                    </div>
                </div>
                <div className="events">
                    {showEventPopup && (<div className="events-popup">
                        <div className="timeinput">
                            <div className="event-popup-time">Time</div>
                            <input type="number" name="hours" min={0} max={24} className="hours" value={eventTime.hours} onChange={(e) => (setEventTime({ ...eventTime, hours: e.target.value }))} />
                            <input type="number" name="minutes" min={0} max={60} className="minutes" value={eventTime.minutes} onChange={(e) => { setEventTime({ ...eventTime, minutes: e.target.value }) }} />

                        </div>
                        <textarea placeholder="Event Name (Character limit: 60)" name="" id="" value={eventText} onChange={(e) => { if (e.target.value.length <= 60) { setEventText(e.target.value) } }}></textarea>
                        <button className="event-popup-button" onClick={() => (handleEventSubmit())}>{editingEvent ? "Update Event" : "Add Event"}</button>
                        <button className="close-event-popup" onClick={() => (setShowEventPopup(false))}> < i class='bxr  bx-x'  ></i></button>
                    </div>)}
                    {events.map((event, index) => (
                        <div className="event" key={index}>
                            <div className="event-date-wrapper">
                                <div className="event-date">{`${Months[event.date.getMonth()]} ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
                                <div className="event-time">{event.time}</div>
                            </div>
                            <div className="event-text">{event.text}</div>
                            <div className="event-buttons">
                                < i class='bxr  bxs-edit-alt' onClick={() => handleEditEvent(event)}></i>
                                < i class='bxr  bx-x-square' onClick={() => handleDeleteEvent(event)}></i>
                            </div>
                        </div>))}

                </div>
            </div>
        </ErrorBoundary>
    )
}

export default CalendarApp
