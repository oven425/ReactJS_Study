/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import PropTypes from 'prop-types';
import './Calendar.css'

export const Calendar = ({onSelectChange}) => {

    const [displayMonth, setDisplayMonth] = useState(new Date())
    const [dates, setDates] = useState(() => {
        let dds = []
        dds[0] = new Date();
        dds[34] = new Date();
        dds.fill(new Date())
        return dds
    })

    const SetMonth = useCallback((date) => {
        console.log(`SetMonth: ${date}`)
        let cur_date = new Date(date.getFullYear(), date.getMonth(), 1)
        let first_day = cur_date.getDay()
        cur_date.setDate(-first_day)
        let dds = []
        for (let i = 0; i < 35; i++) {
            dds.push(new Date(cur_date.getFullYear(), cur_date.getMonth(), cur_date.getDate()))
            cur_date.setDate(cur_date.getDate() + 1)
        }
        setDates(prev => {
            return dds
        })
    }, [])

    const effect_setMonth = useEffect(() => {
        console.log('effect_setMonth')
        SetMonth(displayMonth)
    }, [SetMonth, displayMonth])

    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setNow((prev) => {
    //             //console.log(prev)
    //             return new Date()
    //         })
    //     }, 1000);
    //     return (() => {
    //         clearInterval(timer)
    //     });
    // }, [])

    const prevMonth = () => {
        console.log('prevMonth')
        setDisplayMonth(prev => {
            return new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        })
    }

    const nextMonth = () => {
        console.log('nextMonth')
        setDisplayMonth(prev => {
            return new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        })
    }

    function selectDate(x) {
        console.log(`selectDate ${x}`)
        onSelectChange(x)
        
    }

    return (
        <div className="calendar">
            <div className="calendar_option">
                <button style={{justifySelf:"start"}} onClick={prevMonth}>&lt;</button>
                <div style={{justifySelf:"center"}} >{displayMonth.getFullYear()}/{displayMonth.getMonth()}</div>
                <button style={{justifySelf:"end"}} onClick={nextMonth} >&gt;</button>
            </div>
            <div className="calendaritems_container">
                <div style={{justifySelf:"center"}}>日</div>
                <div style={{justifySelf:"center"}}>一</div>
                <div style={{justifySelf:"center"}}>二</div>
                <div style={{justifySelf:"center"}}>三</div>
                <div style={{justifySelf:"center"}}>四</div>
                <div style={{justifySelf:"center"}}>五</div>
                <div style={{justifySelf:"center"}}>六</div>
                {
                    dates.map((item, index) => {
                        return (
                             <div style={{justifySelf:"center"}} onClick={()=>{selectDate(item)}} key={index}>{item.getDate()}</div>
                            //<CalendarItem currentDate={item} key={index}></CalendarItem>
                        )
                    })
                }
            </div>
            {/* <input type="text" onChange={onChangeHeadline} /> */}
        </div>
    );
}

const CalendarItem=({currentDate})=>{
    return(
        <div style={{justifySelf:"center"}}>
            {currentDate.getDate()}
        </div>
    )
}


