/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Calendar } from './Calendar'
import { MediaCapture } from './MediaCapture';
import { useState, useMemo } from 'react';
import { useRef } from 'react';
import { ImageEdit } from './ImageEdit';
import { Ribbon } from './Ribbon'


function App() {

  const calendar = useRef()
  const onSelectChange1 = (date) => {
    console.log(`App onSelectChange`)
    console.log(date)
  }

  const nextMonth = () => {
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

  const [text, setText] = useState("123");
  const onchange1 = (e)=>{
    setText(e.target.value);
//console.log(e);
  }

  return (
    // <div>
    //   <input value={text} type="text" onChange={(e)=>onchange1(e)}></input>
    //   <Ribbon text={text}></Ribbon>
    // </div>
<ImageEdit></ImageEdit>
  );
}






export default App;
