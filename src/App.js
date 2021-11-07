/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Calendar } from './Calendar'
import { MediaCapture } from './MediaCapture';
import { useState, useMemo, useEffect } from 'react';
import { useRef } from 'react';
import { ImageEdit } from './ImageEdit';
import { useRect } from './useRect'
import { useSelectRect } from './useSelectRect'
import { useResizeRect, ResizeTypes } from "./useResizeRect";
import { useEditRect } from './useEditRect'
import { useWindowSize } from './useWindowSize'
import ruleshor from './svg/rule_hor.svg'
import rulesver from './svg/rule_ver.svg'
import './StatusBar.css'
import largeicon from './img/64x64.png'
import smallicion from './img/16x16.png'
import mediumicon from './img/32x32.png'
import { Ribbon, RibbonButton, RibbonGroup, RibbonTab, RibbonTabItem } from './RibbonControl/Ribbon';



function App() {
  return (

    <div>
      {/* <img src={largecion} alt="123"></img> */}
      <Ribbon>
        <RibbonTab lable="Home">
          <RibbonGroup lable="Clipboard">
            <RibbonButton largsource={largeicon} smallsource={smallicion} lable="AA"></RibbonButton>
            {/* <div style={{ width: "100px", background: "red" }}>Red</div>
          <div style={{ width: "100px", height: "100px", background: "green" }}>Red</div> */}
          </RibbonGroup>
          <RibbonGroup lable="Image">
            <div style={{ width: "100px", background: "red" }}>Red</div>
            <div style={{ width: "100px", height: "100px", background: "green" }}>Red</div>
          </RibbonGroup>
          <RibbonGroup lable="Tools">
            <div style={{ width: "100px", background: "red" }}>Red</div>
            <div style={{ width: "100px", height: "100px", background: "green" }}>Red</div>
          </RibbonGroup>
          <RibbonGroup lable="Shapes">
            <div style={{ width: "100px", background: "red" }}>Red</div>
            <div style={{ width: "100px", height: "100px", background: "green" }}>Red</div>
          </RibbonGroup>
          <RibbonGroup lable="Sizes">
            <div style={{ width: "100px", background: "red" }}>Red</div>
            <div style={{ width: "100px", height: "100px", background: "green" }}>Red</div>
          </RibbonGroup>
          <RibbonGroup lable="Colors">
            <div style={{ width: "100px", background: "red" }}>Red</div>
            <div style={{ width: "100px", height: "100px", background: "green" }}>Red</div>
          </RibbonGroup>
        </RibbonTab>
        <RibbonTab lable="View">
        </RibbonTab>
      </Ribbon>
      {/* <RibbonTab>
        <RibbonTabItem title="Red">
          <RibbonGroup title="Clipboard">
            <RibbonButton lable="Zoom In"></RibbonButton>
            <RibbonButton lable="Zoom Out"></RibbonButton>
            <RibbonButton lable="100%"></RibbonButton>
            <div style={{ width: "100px", background: "red" }}>Red</div>
          </RibbonGroup>
          <RibbonGroup title="Image">
            <div style={{ width: "100px", height: "100px", background: "green" }}>Red</div>
          </RibbonGroup>
          <RibbonGroup title="Tool">
            <div style={{ width: "100px", height: "100px", background: "blue" }}>Red</div>
          </RibbonGroup>
        </RibbonTabItem>
        <RibbonTabItem title="Green">
        <RibbonGroup title="Clipboard">
            <div style={{ width: "100px", height: "200px", background: "red" }}>Green</div>
          </RibbonGroup>
          <RibbonGroup title="Image">
            <div style={{ width: "100px", height: "100px", background: "green" }}>Green</div>
          </RibbonGroup>
          <RibbonGroup title="Tool">
            <div style={{ width: "100px", height: "100px", background: "blue" }}>Green</div>
          </RibbonGroup>

        </RibbonTabItem>
        <RibbonTabItem title="Blue">
        <RibbonGroup title="Clipboard">
            <div style={{ width: "100px", height: "100px", background: "red" }}>Blue</div>
          </RibbonGroup>
          <RibbonGroup title="Image">
            <div style={{ width: "100px", height: "100px", background: "green" }}>Blue</div>
          </RibbonGroup>
          <RibbonGroup title="Tool">
            <div style={{ width: "100px", height: "100px", background: "blue" }}>Blue</div>
          </RibbonGroup>

        </RibbonTabItem>
      </RibbonTab> */}
      {/* <StatusBar>
        <StatusBarItem>AAAA</StatusBarItem>
        <StatusBarItem>BBBB</StatusBarItem>
        <StatusBarItem>CCCC</StatusBarItem>
        <StatusBarItem>DDDD</StatusBarItem>
      </StatusBar> */}
    </div>
  )

  // const canvas = useRef();
  // const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // const [canvasSize, setCanvasSize] = useState({ width: 4000 / window.devicePixelRatio, height: 6000 / window.devicePixelRatio });
  // const [selectRect, setSelectRectBegin, setSelectRectMove, setSelectRectEnd] = useSelectRect();
  // const [resizeRect, setResizeRectBegin, setResizeRectMove, setResizeRectEnd] = useResizeRect();
  // const [editRect, showEditRect, hideEditRect, dragEditRectBegin, dragEditRectMove, dragEditRectEnd] = useEditRect();
  // const editReizeAction = useRef("");
  // const canvasResizeAction = useRef("");
  // const [rulehor, setRulehor] = useState([]);
  // const [rulever, setRulever] = useState([]);
  // const windowSize = useWindowSize();

  // useEffect(() => {
  //   console.log(`devicePixelRatio:${window.devicePixelRatio}`);
  //   //let paint_root = document.getElementById("paint_root");
  //   let paint = document.getElementById("paint");
  //   //let root_rect = paint_root.getBoundingClientRect();
  //   //console.log(`panit_root w:${root_rect.width} h:${root_rect.height}`);
  //   // paint.style.width = `${root_rect.width-14}px`;
  //   // paint.style.height = `${root_rect.height-10}px`;
  //   let rules = [];
  //   //console.log(`offsetWidth:${paint.offsetWidth} canvasWidth:${canvas.current.width}`);
  //   let maxw = paint.offsetWidth > canvas.current.width ? paint.offsetWidth : canvas.current.width;
  //   for (let begin = 0; begin < maxw * window.devicePixelRatio; begin = begin + 100) {
  //     rules.push(begin);
  //   }
  //   setRulehor(rules);
  //   let maxh = paint.offsetHeight > canvas.current.height ? paint.offsetHeight : canvas.current.height;
  //   rules = [];
  //   for (let begin = 0; begin < maxh * window.devicePixelRatio; begin = begin + 100) {
  //     rules.push(begin);
  //   }
  //   // for (let begin = 0; begin < 15; begin = begin + 1) {
  //   //   rules.push(begin);
  //   // }
  //   setRulever(rules);
  //   console.log(`offsetWidth:${paint.offsetWidth * window.devicePixelRatio}  offsetHeight:${paint.offsetHeight * window.devicePixelRatio}`);


  //   var scale = window.devicePixelRatio;
  //   var ctx = canvas.current.getContext("2d");
  //   ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
  //   //ctx.scale(scale, scale);
  //   console.log(`width:${canvas.current.width}  height:${canvas.current.height}`);
  //   ctx.fillStyle = 'white';
  //   ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
  //   ctx.strokeStyle = '#F9F9F9';
  //   for (let y = 0; y < canvas.current.height; y = y + 10) {
  //     ctx.moveTo(0, y + 0.5);
  //     ctx.lineTo(canvas.current.width, y + 0.5);
  //     //ctx.stroke();
  //   }
  //   for (let x = 0; x < canvas.current.width; x = x + 10) {
  //     ctx.moveTo(x + 0.5, 0);
  //     ctx.lineTo(x + 0.5, canvas.current.height);
  //     //ctx.stroke();
  //   }

  //   ctx.strokeStyle = '#808080';
  //   for (let y = 0; y < canvas.current.height; y = y + 10) {
  //     ctx.setLineDash([1, 1]);
  //     ctx.moveTo(0, y + 0.5);
  //     ctx.lineTo(canvas.current.width, y + 0.5);
  //     //ctx.stroke();
  //   }

  //   for (let x = 0; x < canvas.current.width; x = x + 10) {
  //     ctx.setLineDash([1, 1]);
  //     ctx.moveTo(x + 0.5, 0);
  //     ctx.lineTo(x + 0.5, canvas.current.height);
  //     //ctx.stroke();
  //   }
  //   ctx.stroke();

  // }, [canvasSize, windowSize])

  // const mouseDown = (e, action) => {
  //   console.log(e);
  //   //console.log(`action:${action}`);
  //   let paint = document.getElementById("paint");
  //   //console.log(`paint offsetWidth:${paint.offsetWidth} offsetLeft:${paint.offsetLeft}`);
  //   //console.log(`paint scrollWidth:${paint.scrollWidth} scrollLeft:${paint.scrollLeft}`);
  //   //console.log(`paint clientWidth:${paint.clientWidth} clientLeft:${paint.clientLeft}`);


  //   if (paint === null) {
  //     return;
  //   }
  //   let rect = paint.getBoundingClientRect();
  //   let x = e.clientX - rect.x;
  //   let y = e.clientY - rect.y;


  //   if (canvasResizeAction.current === "")

  //     switch (e.target.id) {
  //       case "canvas_track_right":
  //       case "canvas_track_right_bottom":
  //       case "canvas_track_bottom":
  //         canvasResizeAction.current = action;

  //         setResizeRectBegin(action, 0, 0, canvasSize.width, canvasSize.height);
  //         break;
  //       default: break;

  //     }

  //   if (editRect.show === true && editReizeAction.current === "") {
  //     switch (e.target.id) {
  //       case "edit_track_drag":
  //         editReizeAction.current = action;
  //         dragEditRectBegin(x, y, { x: 0, y: 0, width: canvasSize.width, height: canvasSize.height });
  //         break;
  //       case "edit_track_left_top":
  //       case "edit_track_top":
  //       case "edit_track_top_right":
  //       case "edit_track_left":
  //       case "edit_track_right":
  //       case "edit_track_left_bottom":
  //       case "edit_track_bottom":
  //       case "edit_track_right_bottom":
  //         editReizeAction.current = action;
  //         setResizeRectBegin(action, editRect.x, editRect.y, editRect.width, editRect.height);
  //         break;
  //       default:
  //         editReizeAction.current = "";
  //         break;
  //     }

  //   }

  //   if (x < canvasSize.width && y < canvasSize.height && editReizeAction.current === "") {
  //     hideEditRect();
  //     if (canvasResizeAction.current === "") {
  //       let limit = { x: 0, y: 0, width: 0, height: 0 };
  //       limit.x = parseInt(paint.style.left);
  //       limit.y = parseInt(paint.style.top);
  //       limit.width = parseInt(paint.style.width);
  //       limit.height = parseInt(paint.style.height);
  //       setSelectRectBegin(x, y, 0, 0, limit);

  //     }

  //   }

  //   e.cancelBubble = true;
  // }

  // const mouseMove = (e) => {
  //   //console.log(e);

  //   let paint = document.getElementById("paint");
  //   if (paint === null) {
  //     return;
  //   }
  //   let rect = paint.getBoundingClientRect();
  //   let x = e.clientX - rect.x;
  //   let y = e.clientY - rect.y;
  //   if (e.target === paint || e.target === canvas.current) {
  //     setMousePos({ x: x, y: y });
  //   }
  //   //console.log(`action:${editReizeAction.current}`);
  //   if (canvasResizeAction.current !== "") {
  //     setResizeRectMove(x, y);
  //   }
  //   if (editReizeAction.current !== "") {
  //     switch (editReizeAction.current) {
  //       case "drag":
  //         dragEditRectMove(x, y);
  //         break;
  //       default:
  //         setResizeRectMove(x, y);
  //         break;
  //     }

  //   }
  //   else if (selectRect.show === true) {
  //     setSelectRectMove(x, y);
  //   }

  // }

  // const mouseUp = (e) => {
  //   console.log(`mouseUp canvasResizeAction:${canvasResizeAction.current} editReizeAction:${editReizeAction.current} selectRect.show:${selectRect.show}`);
  //   if (canvasResizeAction.current !== "") {
  //     setResizeRectEnd();
  //     setCanvasSize({ width: resizeRect.width, height: resizeRect.height });
  //     canvasResizeAction.current = "";
  //   }
  //   if (editReizeAction.current !== "") {
  //     switch (editReizeAction.current) {
  //       case "drag":
  //         break;
  //       default:
  //         setResizeRectEnd();
  //         showEditRect(resizeRect.x, resizeRect.y, resizeRect.width, resizeRect.height);
  //         break;
  //     }
  //   }
  //   if (selectRect.show === true) {
  //     setSelectRectEnd();
  //     if (selectRect.width > 0 && selectRect.height > 0) {
  //       showEditRect(selectRect.x, selectRect.y, selectRect.width, selectRect.height);
  //     }
  //   }
  //   editReizeAction.current = "";
  // }

  // const contextMenu = (e) => {
  //   console.log(e);
  //   e.preventDefault();
  // }

  // const paintScroll = (e) => {
  //   document.getElementById("rule_hor").scrollLeft = e.target.scrollLeft;
  //   document.getElementById("rule_ver").scrollTop = e.target.scrollTop;
  // }

  // const dropFile =(e)=>{
  //   console.log(e);
  // }

  // return (
  //   <div style={{ display: "flex", flexDirection: "column", height: "100%" }} draggable="true" onDrop={(e)=>dropFile(e)}>
  //     <div>
  //       Ribbon
  //     </div>
  //     <div id="rowcontent" style={{ flexGrow: "1", height: "88%" }} onMouseDown={(e) => { mouseDown(e) }} onMouseMove={(e) => { mouseMove(e) }} onMouseUp={(e) => { mouseUp(e) }} onContextMenu={(e) => contextMenu(e)}>
  //       <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gridTemplateRows: "auto 1fr", height: "100%" }}>
  //         <div style={{ width: `${17 / window.devicePixelRatio}`, height: `${17 / window.devicePixelRatio}`, background: "rgb(241,243,248)" }}></div>
  //         <div id="rule_hor" style={{ position: "relative", display: "flex", flexDirection: "row", overflow: "hidden" }}>
  //           <div style={{ flexShrink: "0",width: `${5 / window.devicePixelRatio}px`, height: `${17 / window.devicePixelRatio}`, background: "rgb(241,243,248)" }}></div>
  //           {
  //             rulehor.map((item, index) => {
  //               return (
  //                 <div style={{fontSize:"6px", background:`url(${ruleshor})`, flexShrink: "0", width: `${100 / window.devicePixelRatio}px`, height: `${17 / window.devicePixelRatio}px`}} key={index}>
  //                   {item}
  //                   </div>
  //               )
  //             })
  //           }
  //           <div style={{ position: "absolute", left: `${mousePos.x + 5}px`, width: `${1 / window.devicePixelRatio}px`, height: `${17 / window.devicePixelRatio}px`, background: "red" }}></div>
  //         </div>
  //         <div id="rule_ver" style={{alignSelf: "stretch", justifySelf:"stretch", overflow: "hidden",position: "relative" }}>
  //           <div style={{ flexShrink: "0",height: `${5 / window.devicePixelRatio}px`, background: "rgb(241,243,248)" }}></div>
  //           {
  //             rulever.map((item, index) => {
  //               return (
  //                 <div style={{background:`url(${rulesver})`, height: `${100 / window.devicePixelRatio}px`, width: `${17 / window.devicePixelRatio}px`}} key={index}>
  //                   <div style={{height:`${1 / window.devicePixelRatio}px`}}></div>
  //                   <div style={{ writingMode:"vertical-rl", fontSize:"10px", transform:"rotate(180deg)"}}>{item}</div>
  //                 </div>
  //               )
  //             })
  //           }
  //           <div style={{ position: "absolute", top: `${mousePos.y + 5}px`, width: `${17 / window.devicePixelRatio}px`, height: `${1 / window.devicePixelRatio}px`, background: "red" }}></div>
  //         </div>

  //         <div id="paint" onScroll={(e) => paintScroll(e)} style={{ alignSelf: "stretch", justifySelf:"stretch", position: "relative", marginTop: `${5 / window.devicePixelRatio}px`, marginLeft: `${5 / window.devicePixelRatio}px`, overflow: "auto" }}>
  //           <div style={{ position: "absolute", display: "grid", gridTemplateColumns: "auto auto", gridTemplateRows: "auto auto", justifySelf: "left", alignContent: "start" }}>
  //             <canvas ref={canvas} width={`${canvasSize.width}px`} height={`${canvasSize.height}px`}></canvas>
  //             <div id="canvas_track_right" onMouseDown={(e) => mouseDown(e, ResizeTypes.right)} style={{ display: `${selectRect.show || editRect.show ? "none" : "block"}`, gridColumn: "2", alignSelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "w-resize" }}></div>
  //             <div id="canvas_track_right_bottom" onMouseDown={(e) => mouseDown(e, ResizeTypes.right_bottom)} style={{ display: `${selectRect.show || editRect.show ? "none" : "block"}`, gridColumn: "2", gridRow: "2", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "nw-resize" }}></div>
  //             <div id="canvas_track_bottom" onMouseDown={(e) => mouseDown(e, ResizeTypes.bottom)} style={{ display: `${selectRect.show || editRect.show ? "none" : "block"}`, gridRow: "2", justifySelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "n-resize" }}></div>
  //           </div>
  //           <div id="select" style={{ left: `${selectRect.x}px`, top: `${selectRect.y}px`, width: `${selectRect.width}px`, height: `${selectRect.height}px`, display: `${selectRect.show ? "block" : "none"}`, border: "1px solid black", borderStyle: "dashed", position: "absolute" }} ></div>
  //           <div id="edit_track" style={{ border: "1px solid #0078D7", borderStyle: "dashed", position: "absolute", left: `${editRect.x}px`, top: `${editRect.y}px`, height: `${editRect.height}px`, width: `${editRect.width}px`, display: `${editRect.show ? "grid" : "none"}`, gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr" }}>
  //             <div id="edit_track_drag" onMouseDown={(e) => mouseDown(e, "drag")} style={{ gridColumn: "1 / 4", gridRow: "1 / 4", cursor: "move" }}></div>
  //             <div id="edit_track_left_top" onMouseDown={(e) => mouseDown(e, ResizeTypes.left_top)} style={{ gridColumn: "1", gridRow: "1", alignSelf: "start", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "nw-resize", marginLeft: "-5px", marginTop: "-5px" }}></div>
  //             <div id="edit_track_top" onMouseDown={(e) => mouseDown(e, ResizeTypes.top)} style={{ gridColumn: "2", gridRow: "1", alignSelf: "start", justifySelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "n-resize", marginTop: "-5px" }}></div>
  //             <div id="edit_track_top_right" onMouseDown={(e) => mouseDown(e, ResizeTypes.top_right)} style={{ gridColumn: "3", gridRow: "1", alignSelf: "start", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "sw-resize", marginTop: "-5px", marginRight: "-5px" }}></div>
  //             <div id="edit_track_left" onMouseDown={(e) => mouseDown(e, ResizeTypes.left)} style={{ gridColumn: "1", gridRow: "2", alignSelf: "center", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "w-resize", marginLeft: "-5px" }}></div>
  //             <div id="edit_track_right" onMouseDown={(e) => mouseDown(e, ResizeTypes.right)} style={{ gridColumn: "3", gridRow: "2", alignSelf: "center", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "w-resize", marginRight: "-5px" }}></div>
  //             <div id="edit_track_left_bottom" onMouseDown={(e) => mouseDown(e, ResizeTypes.left_bottom)} style={{ gridColumn: "1", gridRow: "3", alignSelf: "end", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "sw-resize", marginLeft: "-5px", marginBottom: "-5px" }}></div>
  //             <div id="edit_track_bottom" onMouseDown={(e) => mouseDown(e, ResizeTypes.bottom)} style={{ gridColumn: "2", gridRow: "3", alignSelf: "end", justifySelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "n-resize", marginBottom: "-5px" }}></div>
  //             <div id="edit_track_right_bottom" onMouseDown={(e) => mouseDown(e, ResizeTypes.right_bottom)} style={{ gridColumn: "3", gridRow: "3", alignSelf: "end", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px", cursor: "nw-resize", marginRight: "-5px", marginBottom: "-5px" }}></div>
  //           </div>
  //           <div style={{ left: `${resizeRect.x}px`, top: `${resizeRect.y}px`, width: `${resizeRect.width}px`, height: `${resizeRect.height}px`, display: `${resizeRect.show ? "block" : "none"}`, cursor: `${resizeRect.cursor}`, border: "1px solid black", borderStyle: "dashed", position: "absolute" }}></div>
  //         </div>

  //       </div>

  //     </div>
  //     <div style={{borderTop:"1px solid rgb(215,215,215)" ,background:"rgb(240,240,240)", height:"25px" }}>
  //       <div style={{display:"flex", alignItems:"center"}}>
  //           <div style={{background:`url(${statusbar_pos})`, backgroundSize:"contain", width:"20px" ,height:"20px"}}></div>
  //           <div style={{fontSize:"12px"}}>{`${mousePos.x}, ${mousePos.y} pixel`}</div>
  //       </div>
  //     </div>
  //   </div>
  // )

  // return (
  //   <ImageEdit></ImageEdit>
  // );
}






export default App;
