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
import { useResizeRect, ResizeTypes } from "./useResizeRect";
import { useEditRect } from './useEditRect'



function App() {
  const canvas = useRef();
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [selectRect, setSelectRectBegin, setSelectRectMove, setSelectRectEnd] = useSelectRect();
  //const [editRect, setEditRect] = useState({ x: 30, y: 60, width: 100, height: 200, show: false });
  const [resizeRect, setResizeRectBegin, setResizeRectMove, setResizeRectEnd] = useResizeRect();
  const [editRect, showEditRect, hideEditRect, dragEditRectBegin, dragEditRectMove, dragEditRectEnd] = useEditRect();
  const editMovePos = useRef({ x: 0, y: 0 });
  const editReizeAction = useRef("");
  useEffect(() => {
    // const ctx = canvas.current.getContext("2d");

    // //console.log(`width:${video.width}  height:${video.height}`);
    // ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    // ctx.save();   //儲存狀態
    // ctx.fillStyle = '#ffff00';
    // //ctx.fillRect(x, y, width, height);
    // ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

    // ctx.restore(); //到此才輸出，才不會還沒整體操作完就放出，會造成畫面快速抖動

    const ctx = canvas.current.getContext("2d");
    ctx.setLineDash([5,5]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';

    ctx.beginPath();
    ctx.moveTo(10, 100);
    ctx.lineTo(400, 100);
    ctx.stroke();
  }, [])

  const mouseDown = (e, action) => {
    //console.log(e.target.id);
    //console.log(`action:${action}`);
    let paint = document.getElementById("paint");
    let rect = paint.getBoundingClientRect();
    let x = e.clientX - rect.x;
    let y = e.clientY - rect.y;

    if (editRect.show === true && editReizeAction.current === "") {

      console.log(`id:${e.target.id} ${e.target.id === "edit_track_left_top"}`);
      switch (e.target.id) {
        case "edit_track_drag":
          editReizeAction.current = action;
          dragEditRectBegin(x,y,{x:0,y:0,width:canvasSize.width,height:canvasSize.height});
          break;
        case "edit_track_left_top":
        case "edit_track_top":
        case "edit_track_top_right":
        case "edit_track_left":
        case "edit_track_right":
        case "edit_track_left_bottom":
        case "edit_track_bottom":
        case "edit_track_right_bottom":
          editReizeAction.current = action;
          setResizeRectBegin(action, editRect.x, editRect.y, editRect.width, editRect.height);
          break;
        default:
          editReizeAction.current = "";
          break;
      }
    }
    if (x < canvasSize.width && y < canvasSize.height && editReizeAction.current === "") {
      hideEditRect();
      //setEditRect({ x: 0, y: 0, width: 0, height: 0, show: false });
      let limit = { x: 0, y: 0, width: 0, height: 0 };
      limit.x = parseInt(paint.style.left);
      limit.y = parseInt(paint.style.top);
      limit.width = parseInt(paint.style.width);
      limit.height = parseInt(paint.style.height);
      setSelectRectBegin(x, y, 0, 0, limit);
    }
    e.cancelBubble = true;
  }

  const mouseMove = (e) => {
    //console.log(e);
    let paint = document.getElementById("paint");
    let rect = paint.getBoundingClientRect();
    let x = e.clientX - rect.x;
    let y = e.clientY - rect.y;
    console.log(`action:${editReizeAction.current}`);
    if (editReizeAction.current !== "") {
      switch (editReizeAction.current) {
        case "drag":
          dragEditRectMove(x,y);
          break;
        default:
          setResizeRectMove(x, y);
          break;
      }

    }
    else if (selectRect.show === true) {
      setSelectRectMove(x, y);
    }

  }

  const mouseUp = (e) => {
    console.log(e.target);
    if (editReizeAction.current !== "") {
      switch (editReizeAction.current) {
        case "drag":
          break;
        default:
          setResizeRectEnd();
          //setEditRect({ x: resizeRect.x, y: resizeRect.y, width: resizeRect.width, height: resizeRect.height, show: true });
          showEditRect(resizeRect.x, resizeRect.y, resizeRect.width, resizeRect.height);
          break;
      }
    }
    if (selectRect.show === true) {
      setSelectRectEnd();
      if (selectRect.width > 0 && selectRect.height > 0) {
        //setEditRect({ x: selectRect.x, y: selectRect.y, width: selectRect.width, height: selectRect.height, show: true });
        showEditRect(selectRect.x, selectRect.y, selectRect.width, selectRect.height);
      }
    }
    editReizeAction.current = "";
  }

  const contextMenu = (e) => {
    console.log(e);
    e.preventDefault();
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
          <div id="edit_track" style={{ border: "1px solid #0078D7", borderStyle: "dashed", position: "absolute", left: `${editRect.x}px`, top: `${editRect.y}px`, height: `${editRect.height}px`, width: `${editRect.width}px`, display: `${editRect.show ? "grid" : "none"}`, gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr" }}>
            <div id="edit_track_drag" onMouseDown={(e) => mouseDown(e, "drag")} style={{ gridColumn: "1 / 4", gridRow: "1 / 4", cursor: "move" }}></div>
            <div id="edit_track_left_top" onMouseDown={(e) => mouseDown(e, ResizeTypes.left_top)} style={{ gridColumn: "1", gridRow: "1", alignSelf: "start", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "nw-resize", marginLeft: "-5px", marginTop: "-5px" }}></div>
            <div id="edit_track_top" onMouseDown={(e) => mouseDown(e, ResizeTypes.top)} style={{ gridColumn: "2", gridRow: "1", alignSelf: "start", justifySelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "n-resize", marginTop: "-5px" }}></div>
            <div id="edit_track_top_right" onMouseDown={(e) => mouseDown(e, ResizeTypes.top_right)} style={{ gridColumn: "3", gridRow: "1", alignSelf: "start", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "sw-resize", marginTop: "-5px", marginRight: "-5px" }}></div>
            <div id="edit_track_left" onMouseDown={(e) => mouseDown(e, ResizeTypes.left)} style={{ gridColumn: "1", gridRow: "2", alignSelf: "center", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "w-resize", marginLeft: "-5px" }}></div>
            <div id="edit_track_right" onMouseDown={(e) => mouseDown(e, ResizeTypes.right)} style={{ gridColumn: "3", gridRow: "2", alignSelf: "center", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "w-resize", marginRight: "-5px" }}></div>
            <div id="edit_track_left_bottom" onMouseDown={(e) => mouseDown(e, ResizeTypes.left_bottom)} style={{ gridColumn: "1", gridRow: "3", alignSelf: "end", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "sw-resize", marginLeft: "-5px", marginBottom: "-5px" }}></div>
            <div id="edit_track_bottom" onMouseDown={(e) => mouseDown(e, ResizeTypes.bottom)} style={{ gridColumn: "2", gridRow: "3", alignSelf: "end", justifySelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "n-resize", marginBottom: "-5px" }}></div>
            <div id="edit_track_right_bottom" onMouseDown={(e) => mouseDown(e, ResizeTypes.right_bottom)} style={{ gridColumn: "3", gridRow: "3", alignSelf: "end", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "nw-resize", marginRight: "-5px", marginBottom: "-5px" }}></div>
          </div>
          <div style={{ left: `${resizeRect.x}px`, top: `${resizeRect.y}px`, width: `${resizeRect.width}px`, height: `${resizeRect.height}px`, display: `${resizeRect.show ? "block" : "none"}`, cursor: `${resizeRect.cursor}`, border: "1px solid black", borderStyle: "dashed", position: "absolute" }}></div>
        </div>


      </div>
    </div>
  )

  // return (
  //   <ImageEdit></ImageEdit>
  // );
}






export default App;
