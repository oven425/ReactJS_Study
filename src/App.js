/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Calendar } from './Calendar'
import { MediaCapture } from './MediaCapture';
import { useState, useMemo } from 'react';
import { useRef } from 'react';
import { ImageEdit } from './ImageEdit';


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

  // return (
  //   <div>
  //     {/* <MediaCapture></MediaCapture> */}
  //     <button onClick={nextMonth}>Test calendar method</button>
  //     <Calendar ref={calendar} onSelectChange={onSelectChange1}/>
  //   </div>

  // );

  return (
    <ImageEdit></ImageEdit>
  );
}






export default App;
