/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Calendar } from './Calendar'
import { MediaCapture } from './MediaCapture';
import { useState, useMemo, useEffect } from 'react';
import { useRef } from 'react';
import { ImageEdit } from './ImageEdit';
import { Ribbon } from './Ribbon'
import { useRect } from './useRect'
import { useSelectRect } from './useSelectRect'
import { useResizeRect, ResizeTypes } from "./useEditRect";


function App() {
  const canvas = useRef();
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [selectRect, setSelectRectBegin, setSelectRectMove, setSelectRectEnd] = useSelectRect();
  const [editRect, setEditRect] = useState({ x: 30, y: 60, width: 100, height: 200, isshow: false });

  useEffect(() => {
    //setResizeMove(0,0, directions.EAST);
    const ctx = canvas.current.getContext("2d");
    //console.log(`width:${video.width}  height:${video.height}`);
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.save();   //儲存狀態
    ctx.fillStyle = '#ffff00';
    //ctx.fillRect(x, y, width, height);
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

    ctx.restore(); //到此才輸出，才不會還沒整體操作完就放出，會造成畫面快速抖動
  }, [])

  const mouseDown = (e) => {
    console.log(e.target);

    let paint = document.getElementById("paint");
    let rect = paint.getBoundingClientRect();
    let x = e.clientX - rect.x;
    let y = e.clientY - rect.y;
    //console.log(`x:${x} y:${y}`);
    if (x < canvasSize.width && y < canvasSize.height) {

      let limit = { x: 0, y: 0, width: 0, height: 0 };
      limit.x = parseInt(paint.style.left);
      limit.y = parseInt(paint.style.top);
      limit.width = parseInt(paint.style.width);
      limit.height = parseInt(paint.style.height);
      setSelectRectBegin(x, y, 0, 0, limit);
    }

  }

  const mouseMove = (e) => {
    //console.log(e);
    if (selectRect.show === true) {
      let paint = document.getElementById("paint");
      let rect = paint.getBoundingClientRect();
      let x = e.clientX - rect.x;
      let y = e.clientY - rect.y;
      setSelectRectMove(x, y);
    }

  }

  const mouseUp = (e) => {
    console.log(e.target);
    if(selectRect.show === true){
      setSelectRectEnd();
      setEditRect({ x: selectRect.x, y: selectRect.y, width:  selectRect.width, height: selectRect.height, isshow: true });

    }
    
  }

  const contextMenu = (e) => {
    console.log(e);
  }

  const editMovePos = useRef({ x: 0, y: 0 });
  const editReizeAction = useRef("");
  const editTrackdown = (e, action) => {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.x + 5;
      let y = e.clientY - rect.y + 5;
      
      editReizeAction.current = action;
      switch (action) {
          case "drag":
              editMovePos.current.x = x;
              editMovePos.current.y = y;
              break;
          case "left_top":
          case "top":
          case "top_right":
          case "right":
          case "right_bottom":
          case "bottom":
          case "left_bottom":
          case "left":
              //setEditResizeBegin(action, editRect.x, editRect.y, editRect.width, editRect.height);
              break;
          default: break;
      }
  }

  return (
    <div className="box">
      <div className="row header">
        Riibon
      </div>
      <div id="rowcontent" className="row content" onMouseDown={(e) => { mouseDown(e) }} onMouseMove={(e) => { mouseMove(e) }} onMouseUp={(e) => { mouseUp(e) }} onContextMenu={(e) => contextMenu(e)}>
        <div id="paint" style={{ position: "relative", background: "wheat", left: "0px", top: "0px", width: `${canvasSize.width}px`, height: `${canvasSize.height}px`, marginTop: "5px", marginLeft: "5px" }}>
          <canvas ref={canvas} style={{ position: "absolute" }} width={`${canvasSize.width}px`} height={`${canvasSize.height}px`}></canvas>
          <div id="select" style={{ left: `${selectRect.x}px`, top: `${selectRect.y}px`, width: `${selectRect.width}px`, height: `${selectRect.height}px`, display: `${selectRect.show ? "block" : "none"}`, border: "1px solid black", borderStyle: "dashed", position: "absolute" }} ></div>
        </div>
        <div id="edit_track" style={{ border: "1px solid #0078D7", borderStyle: "dashed", position: "absolute", left: `${editRect.x}px`, top: `${editRect.y}px`, height: `${editRect.height}px`, width: `${editRect.width}px`, display: `${editRect.isshow ? "grid" : "none"}`, gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr" }}>
          <div onMouseDown={(e) => editTrackdown(e, "drag")} style={{ gridColumn: "1 / 4", gridRow: "1 / 4", cursor: "move" }}></div>
          <div onMouseDown={(e) => editTrackdown(e, ResizeTypes.left_top)} style={{ gridColumn: "1", gridRow: "1", alignSelf: "start", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "nw-resize", marginLeft: "-5px", marginTop: "-5px" }}></div>
          <div onMouseDown={(e) => editTrackdown(e, ResizeTypes.top)} style={{ gridColumn: "2", gridRow: "1", alignSelf: "start", justifySelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "n-resize", marginTop: "-5px" }}></div>
          <div onMouseDown={(e) => editTrackdown(e, ResizeTypes.top_right)} style={{ gridColumn: "3", gridRow: "1", alignSelf: "start", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "sw-resize", marginTop: "-5px", marginRight: "-5px" }}></div>
          <div onMouseDown={(e) => editTrackdown(e, ResizeTypes.left)} style={{ gridColumn: "1", gridRow: "2", alignSelf: "center", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "w-resize", marginLeft: "-5px" }}></div>
          <div onMouseDown={(e) => editTrackdown(e, ResizeTypes.right)} style={{ gridColumn: "3", gridRow: "2", alignSelf: "center", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "w-resize", marginRight: "-5px" }}></div>
          <div onMouseDown={(e) => editTrackdown(e, ResizeTypes.left_bottom)} style={{ gridColumn: "1", gridRow: "3", alignSelf: "end", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "sw-resize", marginLeft: "-5px", marginBottom: "-5px" }}></div>
          <div onMouseDown={(e) => editTrackdown(e, ResizeTypes.bottom)} style={{ gridColumn: "2", gridRow: "3", alignSelf: "end", justifySelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "n-resize", marginBottom: "-5px" }}></div>
          <div onMouseDown={(e) => editTrackdown(e, ResizeTypes.right_bottom)} style={{ gridColumn: "3", gridRow: "3", alignSelf: "end", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "nw-resize", marginRight: "-5px", marginBottom: "-5px" }}></div>
        </div>

      </div>

    </div>

  )

  // return (
  //   <ImageEdit></ImageEdit>
  // );
}






export default App;
