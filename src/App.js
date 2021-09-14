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
  const [resizeRect, setResizeRectBegin, setResizeRectMove, setResizeRectEnd] = useResizeRect();
  const [editRect, showEditRect, hideEditRect, dragEditRectBegin, dragEditRectMove, dragEditRectEnd] = useEditRect();
  const editReizeAction = useRef("");
  const canvasResizeAction = useRef("");
  const [rulehor, setRulehor] = useState([]);
  const [rulever, setRulever] = useState([]);
  useEffect(() => {

    console.log(`devicePixelRatio:${window.devicePixelRatio}`);
    let paint = document.getElementById("paint");
    let rules = [];
    for (let begin = 0; begin < paint.offsetWidth * window.devicePixelRatio; begin = begin + 100) {
      rules.push(begin);
    }
    setRulehor(rules);

    rules = [];
    for (let begin = 0; begin < paint.offsetHeight * window.devicePixelRatio; begin = begin + 100) {
      rules.push(begin);
    }
    setRulever(rules);
    console.log(`offsetWidth:${paint.offsetWidth * window.devicePixelRatio}  offsetHeight:${paint.offsetHeight * window.devicePixelRatio}`);



    var ctx = canvas.current.getContext("2d");
    console.log(`width:${canvas.current.width}  height:${canvas.current.height}`);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.strokeStyle = '#F9F9F9';
    for (let y = 0; y < canvas.current.height; y = y + 10) {
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(canvas.current.width, y + 0.5);
      //ctx.stroke();
    }
    for (let x = 0; x < canvas.current.width; x = x + 10) {
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, canvas.current.height);
      //ctx.stroke();
    }

    ctx.strokeStyle = '#808080';
    for (let y = 0; y < canvas.current.height; y = y + 10) {
      ctx.setLineDash([1, 1]);
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(canvas.current.width, y + 0.5);
      //ctx.stroke();
    }

    for (let x = 0; x < canvas.current.width; x = x + 10) {
      ctx.setLineDash([1, 1]);
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, canvas.current.height);
      //ctx.stroke();
    }
    ctx.stroke();

  }, [canvasSize])

  const mouseDown = (e, action) => {
    //console.log(e.target.id);
    //console.log(`action:${action}`);
    let paint = document.getElementById("paint");
    console.log(`paint offsetWidth:${paint.offsetWidth} offsetLeft:${paint.offsetLeft}`);
    console.log(`paint scrollWidth:${paint.scrollWidth} scrollLeft:${paint.scrollLeft}`);
    console.log(`paint clientWidth:${paint.clientWidth} clientLeft:${paint.clientLeft}`);


    if (paint === null) {
      return;
    }
    let rect = paint.getBoundingClientRect();
    let x = e.clientX - rect.x;
    let y = e.clientY - rect.y;
    if (canvasResizeAction.current === "")
      switch (e.target.id) {
        case "canvas_track_right":
        case "canvas_track_right_bottom":
        case "canvas_track_bottom":
          canvasResizeAction.current = action;
          setResizeRectBegin(action, 0, 0, canvasSize.width, canvasSize.height);
          break;
        default: break;
      }
    if (editRect.show === true && editReizeAction.current === "") {
      switch (e.target.id) {
        case "edit_track_drag":
          editReizeAction.current = action;
          dragEditRectBegin(x, y, { x: 0, y: 0, width: canvasSize.width, height: canvasSize.height });
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
    if (paint === null) {
      return;
    }
    let rect = paint.getBoundingClientRect();
    let x = e.clientX - rect.x;
    let y = e.clientY - rect.y;
    //console.log(`action:${editReizeAction.current}`);
    if (canvasResizeAction.current !== "") {
      setResizeRectMove(x, y);
    }
    if (editReizeAction.current !== "") {
      switch (editReizeAction.current) {
        case "drag":
          dragEditRectMove(x, y);
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
    //console.log(`mouseUp:${e.target}`);
    if (canvasResizeAction.current !== "") {
      setResizeRectEnd();
      setCanvasSize({ width: resizeRect.width, height: resizeRect.height });
      canvasResizeAction.current = "";
    }
    if (editReizeAction.current !== "") {
      switch (editReizeAction.current) {
        case "drag":
          break;
        default:
          setResizeRectEnd();
          showEditRect(resizeRect.x, resizeRect.y, resizeRect.width, resizeRect.height);
          break;
      }
    }
    if (selectRect.show === true) {
      setSelectRectEnd();
      if (selectRect.width > 0 && selectRect.height > 0) {
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
        Ribbon
      </div>
      <div id="rowcontent" className="row content" onMouseDown={(e) => { mouseDown(e) }} onMouseMove={(e) => { mouseMove(e) }} onMouseUp={(e) => { mouseUp(e) }} onContextMenu={(e) => contextMenu(e)}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gridTemplateRows: "auto 1fr", height: "100%" }}>
          <div style={{ width: `${17 / window.devicePixelRatio}`, height: `${17 / window.devicePixelRatio}` }}></div>
          <div style={{ display: "flex", height: `${17 / window.devicePixelRatio}`, overflow: "hidden" }}>
            <div style={{ width: `${5 / window.devicePixelRatio}px` }}></div>
            {
              rulehor.map((item, index) => {
                return (
                  <svg key={index} width={`${100 / window.devicePixelRatio}`} height={`${17 / window.devicePixelRatio}`}>
                    <rect width={`${100 / window.devicePixelRatio}`} height={`${17 / window.devicePixelRatio}`} fill="rgb(241,243,248)"></rect>
                    <line x1="0" y1="0" x2="0" y2={`${17 / window.devicePixelRatio}`} style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1="10" y1={`${13 / window.devicePixelRatio}`} x2="10" y2={`${17 / window.devicePixelRatio}`} style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1="20" y1={`${13 / window.devicePixelRatio}`} x2="20" y2={`${17 / window.devicePixelRatio}`} style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1="30" y1={`${13 / window.devicePixelRatio}`} x2="30" y2={`${17 / window.devicePixelRatio}`} style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1="40" y1={`${13 / window.devicePixelRatio}`} x2="40" y2={`${17 / window.devicePixelRatio}`} style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1="50" y1={`${13 / window.devicePixelRatio}`} x2="50" y2={`${17 / window.devicePixelRatio}`} style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1="60" y1={`${13 / window.devicePixelRatio}`} x2="60" y2={`${17 / window.devicePixelRatio}`} style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1="70" y1={`${13 / window.devicePixelRatio}`} x2="70" y2={`${17 / window.devicePixelRatio}`} style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1="80" y1={`${13 / window.devicePixelRatio}`} x2="80" y2={`${17 / window.devicePixelRatio}`} style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1="90" y1={`${13 / window.devicePixelRatio}`} x2="90" y2={`${17 / window.devicePixelRatio}`} style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1="0" y1={`${17 / window.devicePixelRatio}`} x2={`${100 / window.devicePixelRatio}`} y2={`${17 / window.devicePixelRatio}`} style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <text x="2" y="8" fill="rg(51,75,106)" fontSize="8">{item}</text>
                  </svg>
                )
              })
            }
          </div>
          <div style={{ display: "flex", flexFlow: "column nowrap", overflow: "visible" }}>
            <div style={{ height: `${5 / window.devicePixelRatio}px` }}></div>
            {
              rulever.map((item, index) => {
                return (
                  <svg key={index} width={`${17 / window.devicePixelRatio}`} height={`${100 / window.devicePixelRatio}`}>
                    <rect width={`${17 / window.devicePixelRatio}`} height={`${100 / window.devicePixelRatio}`} fill="rgb(241,243,248)"></rect>
                    <line x1="0" y1="0" x2={`${17 / window.devicePixelRatio}`} y2="0" style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1={`${12 / window.devicePixelRatio}`} y1="10" x2={`${17 / window.devicePixelRatio}`} y2="10" style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1={`${12 / window.devicePixelRatio}`} y1="20" x2={`${17 / window.devicePixelRatio}`} y2="20" style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1={`${12 / window.devicePixelRatio}`} y1="30" x2={`${17 / window.devicePixelRatio}`} y2="30" style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1={`${12 / window.devicePixelRatio}`} y1="40" x2={`${17 / window.devicePixelRatio}`} y2="40" style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1={`${12 / window.devicePixelRatio}`} y1="50" x2={`${17 / window.devicePixelRatio}`} y2="50" style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1={`${12 / window.devicePixelRatio}`} y1="60" x2={`${17 / window.devicePixelRatio}`} y2="60" style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1={`${12 / window.devicePixelRatio}`} y1="70" x2={`${17 / window.devicePixelRatio}`} y2="70" style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1={`${12 / window.devicePixelRatio}`} y1="80" x2={`${17 / window.devicePixelRatio}`} y2="80" style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1={`${12 / window.devicePixelRatio}`} y1="90" x2={`${17 / window.devicePixelRatio}`} y2="90" style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <line x1={`${17 / window.devicePixelRatio}`} y1="0" x2={`${17 / window.devicePixelRatio}`} y2="100" style={{ stroke: "rgb(142,156,175)", strokeWidth: "1" }} />
                    <text x="2" y="10" fill="rg(51,75,106)" fontSize="8" transform="rotate(90 10,-5)">{item}</text>
                  </svg>
                )
              })
            }
          </div>
          <div id="paint" style={{ position: "relative", marginTop: `${5 / window.devicePixelRatio}px`, marginLeft: `${5 / window.devicePixelRatio}px`, overflow: "auto" }}>
            <div style={{ position: "absolute", display: "grid", gridTemplateColumns: "auto auto", gridTemplateRows: "auto auto", justifySelf: "left", alignContent: "start" }}>
              <canvas ref={canvas} width={`${canvasSize.width/ window.devicePixelRatio}px`} height={`${canvasSize.height/ window.devicePixelRatio}px`}></canvas>
              <div id="canvas_track_right" onMouseDown={(e) => mouseDown(e, ResizeTypes.right)} style={{ display: `${selectRect.show || editRect.show ? "none" : "block"}`, gridColumn: "2", alignSelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "w-resize" }}></div>
              <div id="canvas_track_right_bottom" onMouseDown={(e) => mouseDown(e, ResizeTypes.right_bottom)} style={{ display: `${selectRect.show || editRect.show ? "none" : "block"}`, gridColumn: "2", gridRow: "2", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "nw-resize" }}></div>
              <div id="canvas_track_bottom" onMouseDown={(e) => mouseDown(e, ResizeTypes.bottom)} style={{ display: `${selectRect.show || editRect.show ? "none" : "block"}`, gridRow: "2", justifySelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "n-resize" }}></div>
            </div>
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
      <div className="row footer">
        status bar
      </div>
    </div>
  )

  // return (
  //   <ImageEdit></ImageEdit>
  // );
}






export default App;
