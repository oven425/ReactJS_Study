/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Calendar } from './Calendar'
import { MediaCapture } from './MediaCapture';
import { useState, useMemo } from 'react';
import { useRef } from 'react';


function App() {

  const calendar = useRef()
  const onSelectChange1 = (date) => {
    console.log(`App onSelectChange`)
    console.log(date)
  }

  const nextMonth = ()=>{
    console.log("App nextMonth")
    console.log(calendar)
    calendar.current.nextMonth()
  }
  
  return (
    <div>
      {/* <div className="grid-1">
        <div className="item-1">
          <div>1</div>
        </div>
        <div className="item-2">2</div>
        <div className="item-3">3</div>
        <div className="item-4">4</div>
        <div className="item-5">5</div>
        <div className="item-6">6</div>
        <div className="item-7">7</div>
        <div className="item-8">8</div>
        <div className="item-9">9</div>
      </div> */}
      <MediaCapture></MediaCapture>
      <button onClick={nextMonth}>Test calendar method</button>
      <Calendar ref={calendar} onSelectChange={onSelectChange1}/>
    </div>

  );
}






export default App;
