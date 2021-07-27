/* eslint-disable no-unused-vars */

<<<<<<< HEAD
import { useState, useEffect, useCallback, useMemo, useImperativeHandle, forwardRef } from "react";
import PropTypes from 'prop-types';
import './Calendar.css'
import styled from 'styled-components'
import Checkbox1 from "./Checkbox1";


const TestItem = styled.span`
width:100%;
height:100%;
    background: red;
    display: inline-block;
    border: 3px solid transparent;
    user-select: none;
`;



const Test = styled.input.attrs({
    type: "radio"
})`
    display: none;

    &:hover  &:checked  + ${TestItem}{
        border: 3px solid #59a1da;
    }
=======
import { useState, useEffect, useCallback, useMemo,useImperativeHandle,forwardRef  } from "react";
import PropTypes from 'prop-types';
import './Calendar.css'
import styled from 'styled-components'


const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

>>>>>>> e956d35cf40712a025a47604ef4c3adb8ab60bd2

    &:hover + ${TestItem}{
        border: 3px solid #f2f2f2;
    };
    
    &:checked+ ${TestItem}{
        border: 3px solid #0078D7;
    }

    
`;


const TT = styled.label`
    padding: 0;
    input[type=radio] {
    display: none;
    }
    input[type=radio]+span {
        display: inline-block;
        border: 3px solid transparent;
        user-select: none;
    }

    input[type=radio]:hover+span {
        border: 3px solid #f2f2f2;
    }

    input[type=radio]:checked+span {
        border: 3px solid #0078D7;
    }

    input[type=radio]:hover:checked+span {
        border: 3px solid #59a1da;
    } 
`;

export const Calendar = forwardRef(({ onSelectChange }, ref) => {
    const [now, setNow] = useState(new Date())
    const [displayMonth, setDisplayMonth] = useState(new Date())

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
    }

    useImperativeHandle(ref, () => ({

        nextMonth() {
            nextMonth()
        },
        prevMonth1() {
            prevMonth()
        }

    }));


    return (
        <div>
            <TT>
                <input type="radio" name="tt"></input>
                <span>TT-TT</span>
            </TT>
            <TT>
                <input type="radio" name="tt"></input>
                <span>-TT-</span>
            </TT>
            <div>
                <div style={{ fontSize: "40px", userSelect: "none" }}>{`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`}</div>
                <div className="time_today" onClick={() => { setDisplayMonth(x => x = now) }}>{`${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`}</div>
            </div>
            <div className="calendar">
                <div className="calendar_option">
                    <button style={{ justifySelf: "start" }} onClick={prevMonth}>&lt;</button>
                    <div style={{ justifySelf: "center", userSelect: "none" }}>{displayMonth.getFullYear()}/{displayMonth.getMonth() + 1}</div>
                    <button style={{ justifySelf: "end" }} onClick={nextMonth} >&gt;</button>
                </div>
                <div className="calendaritems_container">
                    <div style={{ justifySelf: "center", userSelect: "none" }}>日</div>
                    <div style={{ justifySelf: "center", userSelect: "none" }}>一</div>
                    <div style={{ justifySelf: "center", userSelect: "none" }}>二</div>
                    <div style={{ justifySelf: "center", userSelect: "none" }}>三</div>
                    <div style={{ justifySelf: "center", userSelect: "none" }}>四</div>
                    <div style={{ justifySelf: "center", userSelect: "none" }}>五</div>
                    <div style={{ justifySelf: "center", userSelect: "none" }}>六</div>
                    {
                        dates.map((item, index) => {
<<<<<<< HEAD
                            return (
=======
                            return (                             
>>>>>>> e956d35cf40712a025a47604ef4c3adb8ab60bd2
                                <label key={index} onClick={() => { selectDate(item, index) }}>
                                    <input type="radio" name="calendar_month"></input>
                                    <span style={{
                                        display: "flex",
                                        flex: "1",
                                        flexDirection:"column",
                                        justifyContent: "space-between",
                                        color: `${item.isToday ? 'white' : item.date.getMonth() === displayMonth.getMonth() ? 'black' : '#A8A8A8'}`,
                                        background: `${item.isToday ? '#0078D7' : 'transparent'}`
                                    }}>{item.date.getDate()}</span>
                                </label>
                            )
                            // return (
                            //     <label key={index} onClick={() => { selectDate(item, index) }}>
                            //         <input type="radio" name="calendar_month"></input>
                            //         <span style={{
                            //             display: "flex",
                            //             justifyContent: "center",
                            //             color: `${item.isToday ? 'white' : item.date.getMonth() === displayMonth.getMonth() ? 'black' : '#A8A8A8'}`,
                            //             background: `${item.isToday ? '#0078D7' : 'transparent'}`
                            //         }}>{item.date.getDate()}</span>
                            //     </label>
                            // )
                        })
                    }
                </div>
            </div>
        </div>

    );
})


