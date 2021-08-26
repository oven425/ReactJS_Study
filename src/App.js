/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Calendar } from './Calendar'
import { MediaCapture } from './MediaCapture';
import { useState, useMemo } from 'react';
import { useRef } from 'react';
import { ImageEdit } from './ImageEdit';
import { Ribbon } from './Ribbon'

export const useRect = () => {
  const [x,setX] = useState(0);
  const [width,setWidth] = useState(0);
  const [y,setY] = useState(0);
  const [height,setHeight] = useState(0);


  let left = useRef(0);
  let top = 0;
  let right = 0;
  let bottom = 0;
  const setBegin = (x, y) => {

    left.current = x;
    top = y;
    console.log(`setBegin left:${left.current} top:${top}`);
    change();
  }
  const setEnd = (x, y) => {
    right = x;
    bottom = y;
    change();
  }

  const change=()=>{
    console.log(`change left:${left.current} top:${top}`);
    if(left.current > right){
      console.log(`change1 left:${left.current} top:${top}`);
      setX(right);
    }
    else{
      console.log(`change2 left:${left.current} top:${top}`);
      setX(left.current);
    }
    if(top > bottom){
      setY(bottom);
    }
    else{
      setY(top);
    }
    setWidth(Math.abs(left.current-right));
    setHeight(Math.abs(top-bottom));
  }

  return [x, y, width, height, setBegin, setEnd];
}
function App() {
  const[left,top,w,h,setBegin,setEnd] = useRect();
  return(
<div>
  <button onClick={()=>setBegin(10,10)}>set begin</button>
  <button onClick={()=>setEnd(110,110)}>set end</button>
  <div>{`left:${left} top:${top} width:${w} height:${h}`}</div>
</div>
  );

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


  // return (
  //   <ImageEdit></ImageEdit>
  // );
}






export default App;
