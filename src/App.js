/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Calendar } from './Calendar'
import { useState, useMemo } from 'react';

function App() {

  const onSelectChange1 = (date) => {
    console.log(`App onSelectChange`)
    console.log(date)
  }

  const [displayMonth, setDisplayMonth] = useState(new Date())
  const datas = useMemo(() => {
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
  const nextMonth=()=>{
    setDisplayMonth(x=>x=new Date(displayMonth.getFullYear(), displayMonth.getMonth()+1, 1))
  }
  return (
    <div>
      {/* <button onClick={nextMonth}>next</button>
      {
        datas.map((item, index) => {
          return (
            <div key={index}>{item.date.getDate()}</div>
          )
        })
      } */}
      <Calendar onSelectChange={onSelectChange1}/>
    </div>

  );
}






export default App;
