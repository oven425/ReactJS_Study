/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Calendar } from './Calendar'
import { MediaCapture } from './MediaCapture';
import { useState, useMemo } from 'react';
import { useRef } from 'react';
import { ImageEdit } from './ImageEdit';


function App() {

  // const calendar = useRef()
  // const onSelectChange1 = (date) => {
  //   console.log(`App onSelectChange`)
  //   console.log(date)
  // }

  // const nextMonth = ()=>{
  //   console.log("App nextMonth")
  //   console.log(calendar)
  //   calendar.current.nextMonth()
  // }
  //<ImageEdit></ImageEdit>
  return (
    <ImageEdit></ImageEdit>
    // <div>
    //   <MediaCapture></MediaCapture>
    //   <button onClick={nextMonth}>Test calendar method</button>
    //   <Calendar ref={calendar} onSelectChange={onSelectChange1}/>
    // </div>

  );
}






export default App;
