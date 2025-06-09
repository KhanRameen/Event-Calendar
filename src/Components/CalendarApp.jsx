import "./CalendarApp.css"

const CalendarApp = () => {
    return (
        <div className="calendar-app">
            <div className="calendar">
                <h1 className="heading"> Calendar </h1>
                <div className="navigate-date">
                    <h2 className="month">June </h2>
                    <h2 className="year">2025</h2>
                    <div className="buttons">
                        < i class='bxr  bx-chevron-left'  ></i>
                        < i class='bxr  bx-chevron-right'  ></i>
                    </div>
                </div>
                <div className="weekdays">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thr</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>
                <div className="days">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span className="current-day">5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>9</span>
                    <span>10</span>
                    <span>11</span>
                    <span>12</span>
                    <span>13</span>
                    <span>14</span>
                    <span>15</span>
                    <span>16</span>
                    <span>17</span>
                    <span>18</span>
                    <span>19</span>
                    <span>20</span>
                    <span>21</span>
                    <span>22</span>
                    <span>23</span>
                    <span>24</span>
                    <span>25</span>
                    <span>26</span>
                    <span>27</span>
                    <span>28</span>
                    <span>29</span>
                    <span>30</span>
                    <span>31</span>
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
    )
}

export default CalendarApp
