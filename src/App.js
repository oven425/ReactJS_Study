/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Calendar } from './Calendar'
import { MediaCapture } from './MediaCapture';
import { useState, useMemo } from 'react';
import { useRef } from 'react';
import { ImageEdit } from './ImageEdit';
import { Ribbon } from './Ribbon'
import { useRect } from './useRect'
import {useSelectRect} from './useSelectRect'


function App() {
  const [selectRect, setSelectRectBegin, setSelectRectMove, setSelectRectEnd] = useSelectRect();
  const mouseDown = (e) => {
    console.log(e);
    
    let paint = document.getElementById("paint");
    if(e.target === paint){
      let rect = paint.getBoundingClientRect();
      let x = e.clientX - rect.x;
      let y = e.clientY - rect.y;
      let limit = {x:0,y:0,width:0,height:0};
      limit.x = parseInt(paint.style.left);
      limit.y = parseInt(paint.style.top);
      limit.width = parseInt(paint.style.width);
      limit.height = parseInt(paint.style.height);
      setSelectRectBegin(x, y,0,0, limit);
    }
    
  }

  const mouseMove = (e) => {
    //console.log(e);
    if(selectRect.show===true){
      let paint = document.getElementById("paint");
      let rect = paint.getBoundingClientRect();
      let x = e.clientX - rect.x ;
      let y = e.clientY - rect.y ;
      setSelectRectMove(x, y);
    }
    
  }

  const mouseUp = (e) => {
    console.log(e);
    setSelectRectEnd();
  }

  const contextMenu=(e)=>{
    console.log(e);
  }

  return (
    <div className="box">
      <div className="row header">
        Riibon
      </div>
      <div id="rowcontent" className="row content" onMouseDown={(e) => { mouseDown(e) }} onMouseMove={(e) => { mouseMove(e) }} onMouseUp={(e) => { mouseUp(e) }} onContextMenu={(e)=>contextMenu(e)}>
        <div id="paint" style={{ position: "relative", background: "wheat", left:"0px", top:"0px", width: "800px", height: "600px", marginTop: "5px", marginLeft: "5px" }}>
          <div id="select" style={{ left: `${selectRect.x}px`, top: `${selectRect.y}px`, width: `${selectRect.width}px`, height: `${selectRect.height}px`, display:`${selectRect.show?"block":"none"}`, border: "1px solid black", borderStyle: "dashed", position: "absolute" }} ></div>
        </div>

      </div>

    </div>

  )

  // return (
  //   <ImageEdit></ImageEdit>
  // );
}






export default App;
