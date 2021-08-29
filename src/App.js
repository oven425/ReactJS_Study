/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Calendar } from './Calendar'
import { MediaCapture } from './MediaCapture';
import { useState, useMemo } from 'react';
import { useRef } from 'react';
import { ImageEdit } from './ImageEdit';
import { Ribbon } from './Ribbon'
import {useRect} from './useRect'


function App() {
//   const[rect,setBegin,setEnd] = useRect();
//   return(
// <div>
//   <button onClick={()=>setBegin(10,10)}>set begin</button>
//   <button onClick={()=>setEnd(110,110)}>set end</button>
//   {/* <div>{`left:${rect.x} top:${top} width:${w} height:${h}`}</div> */}
//   <div>{JSON.stringify(rect)}</div>
//   <div style={{left:`${rect.x}px`, top:`${rect.y}px`, width:`${rect.width}px`, height:`${rect.height}px`, background:"red", position:"relative"}}></div>
// </div>
//   );

  // const calendar = useRef()
  // const onSelectChange1 = (date) => {
  //   console.log(`App onSelectChange`)
  //   console.log(date)
  // }

  // const nextMonth = () => {
  //   console.log("App nextMonth")
  //   console.log(calendar)
  //   calendar.current.nextMonth()
  // }

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
