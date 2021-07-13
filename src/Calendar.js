/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import './Calendar.css'

export const Calendar = ({ onSelectChange }) => {
    const [now, setNow] = useState(new Date())
    const [displayMonth, setDisplayMonth] = useState(new Date())
    // const [dates, setDates] = useState(() => {
    //     let dds = []
    //     dds[0] = { date: new Date(), selected: false, isMouseOver: false, isToday:false }
    //     dds[34] = { date: new Date(), selected: false, isMouseOver: false, isToday:false }
    //     dds.fill({ date: new Date(), selected: false, isMouseOver: false, isToday:false })
    //     return dds
    // })


    // const SetMonth = useCallback(() => {
    //     console.log(`SetMonth useCallback`)
    //     SetMonth1(displayMonth)
    // }, [displayMonth])

    // const SetMonth1 = (date) => {
    //     console.log(`SetMonth1: ${date}`)
    //     let now = new Date()
    //     let cur_date = new Date(date.getFullYear(), date.getMonth(), 1)
    //     let first_day = cur_date.getDay()
    //     cur_date.setDate(-(first_day-1))
    //     let dds = []
    //     for (let i = 0; i < 35; i++) {
    //         let dd = {
    //             date: new Date(cur_date.getFullYear(), cur_date.getMonth(), cur_date.getDate()),
    //             selected: false,
    //             isMouseOver: false,
    //             isToday:cur_date.getFullYear()===now.getFullYear()&&cur_date.getMonth()===now.getMonth()&&cur_date.getDate()===now.getDate()
    //         }
    //         dds.push(dd)
    //         cur_date.setDate(cur_date.getDate() + 1)
    //     }
    //     setDates(x => x=dds)
    // }

    // const effect_setMonth = useEffect(() => {
    //     console.log('effect_setMonth')
    //     SetMonth(displayMonth)
    // }, [displayMonth])

    const dates = useMemo(() => {
        console.log(`SetMonth1: ${displayMonth}`)
        let now = new Date()
        let cur_date = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1)
        let first_day = cur_date.getDay()
        cur_date.setDate(-(first_day - 1))
        let dds = []
        for (let i = 0; i < 35; i++) {
          let dd = {
            date: new Date(cur_date.getFullYear(), cur_date.getMonth(), cur_date.getDate()),
            selected: false,
            isMouseOver: false,
            isToday: cur_date.getFullYear() === now.getFullYear() && cur_date.getMonth() === now.getMonth() && cur_date.getDate() === now.getDate()
          }
          dds.push(dd)
          cur_date.setDate(cur_date.getDate() + 1)
        }
        return dds
      }, [displayMonth])

    useEffect(() => {
        const timer = setInterval(() => {
            setNow((prev) => {
                return new Date()
            })
        }, 1000);
        return (() => {
            clearInterval(timer)
        });
    }, [])

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

    const selectDate = (x, index) => {
        console.log(`selectDate ${x} index:${index}`)
        onSelectChange(x)
        if(dates[index].selected===false){
            // let cur_date = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), 1)
            // let dds = [...dates]
            // for (let i = 0; i < dds.length; i++) {
            //     dds[i].selected = false
            // }
            // dds[index].selected = true
            // if(dds[index].isMouseOver){
            //     console.log(`isMouseOver index:${index}`)
            // }
            //setDates(dds)
            for (let i = 0; i < dates.length; i++) {
                dates[i].selected = false
            }
            dates[index].selected = true
        }
        
    }
    const onMouseEnter = (x, index) => {
        if (dates[index].isMouseOver === false) {
            console.log(`onMouseEnter index:${index}`)
            // let dds = [...dates]
            // for (let i = 0; i < dds.length; i++) {
            //     dds[i].isMouseOver = false
            // }
            // dds[index].isMouseOver = true
            //setDates(dds)
            // for (let i = 0; i < dates.length; i++) {
            //     dates[i].isMouseOver = false
            // }
            dates[index].isMouseOver = true
        }
    }

    const onMouseLeave = (x, index) => {
        if (dates[index].isMouseOver === true) {
            console.log(`onMouseLeave index:${index}`)
            // let dds = [...dates]
            // dds[index].isMouseOver = false
            //setDates(dds)
            dates[index].isMouseOver = false
        }
    }

    const today=()=>{
        setDisplayMonth(x=>x= now)
    }

    return (
        <div>
            <div>
                <div style={{fontSize:"40px"}}>{`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`}</div>
                <div className="time_today" onClick={()=>{setDisplayMonth(x=>x= now)}}>{`${now.getFullYear()}/${now.getMonth()+1}/${now.getDate()}`}</div>
            </div>
            <div className="calendar">
                <div className="calendar_option">
                    <button style={{ justifySelf: "start" }} onClick={prevMonth}>&lt;</button>
                    <div style={{ justifySelf: "center" }}>{displayMonth.getFullYear()}/{displayMonth.getMonth()+1}</div>
                    <button style={{ justifySelf: "end" }} onClick={nextMonth} >&gt;</button>
                </div>
                <div className="calendaritems_container">
                    <div style={{ justifySelf: "center" }}>日</div>
                    <div style={{ justifySelf: "center" }}>一</div>
                    <div style={{ justifySelf: "center" }}>二</div>
                    <div style={{ justifySelf: "center" }}>三</div>
                    <div style={{ justifySelf: "center" }}>四</div>
                    <div style={{ justifySelf: "center" }}>五</div>
                    <div style={{ justifySelf: "center" }}>六</div>
                    {
                        dates.map((item, index) => {
                            return (
                                <div className={`calendar_item ${item.isToday ? 'calendar_item_tody' : ''} 
                                ${item.selected&&item.isMouseOver?'calendar_item_hover_selected':item.selected?'calendar_item_selected':item.isMouseOver ? 'calendar_item_hover' : ''}
                                 `}
                                    onClick={() => { selectDate(item, index) }}
                                    onMouseEnter={() => { onMouseEnter(item, index) }}
                                    onMouseLeave={() => { onMouseLeave(item, index) }}
                                    key={index}>
                                        <div>
                                            <div style={{color:`${item.isToday ? 'white' : item.date.getMonth()===displayMonth.getMonth()?'black':'#A8A8A8'}`}}>{item.date.getDate()}</div>
                                        </div>
                                    
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    );
}

const CalendarItem = ({ currentDate, click, selected }) => {
    return (
        <div style={{ justifySelf: "center", color: selected ? "green" : "black" }} onClick={(click)}>
            {currentDate.getDate()}
        </div>
    )
}


