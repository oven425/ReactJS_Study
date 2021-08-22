/* eslint-disable no-unused-vars */
import { red } from "@material-ui/core/colors";
import { useState } from "react";
import { useRef, useEffect } from "react"
import './ImageEdit.css'

export const ImageEdit = () => {
    const canvas = useRef();
    const [width, setWidth] = useState(640);
    const [height, setHeight] = useState(480);
    useEffect(() => {
        fillRect(100, 100, 100, 100);
    }, [width, height]);

    const fillRect = (x, y, width, height) => {

        const ctx = canvas.current.getContext("2d");
        //console.log(`width:${video.width}  height:${video.height}`);
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        ctx.save();   //儲存狀態
        ctx.fillStyle = '#ffff00';
        //ctx.fillRect(x, y, width, height);
        ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

        ctx.restore(); //到此才輸出，才不會還沒整體操作完就放出，會造成畫面快速抖動
    };



    const canvas_Mousemove = (data) => {
        //var rect = data.target.getBoundingClientRect();
        //console.log(rect);

        //console.log(`x:${data.clientX-rect.x} y:${data.clientY-rect.y}`);
        //console.log(data);
    }

    let resizemode = "";
    const mousedown = (e, resize) => {
        console.log(e);
        resizemode = resize;
        console.log(`resize ${resizemode}`);
        let tracker = document.getElementById("resize_track");
        tracker.style.width = `${canvas.current.width}px`;
        tracker.style.height = `${canvas.current.height}px`;
        tracker.style.display = "block";
    }

    const mousemove = (data) => {
        //console.log(data.target);
        
        if (edittrack === true ) {
            let paint = document.getElementById("paint");
            let rect = paint.getBoundingClientRect();
            let x = data.clientX - rect.x;
            let y = data.clientY - rect.y;
            let tracker = document.getElementById("edit_track");
            tracker.style.left = `${x}px`;
            tracker.style.top = `${y}px`;
            if(x <=1 || y<=1)
            {
                console.log(rect);
                console.log(`clientX:${data.clientX} clientY:${data.clientY}`);
                console.log(`x:${x} y:${y}`);
            }

        }
        if (resizemode !== "") {
            let tracker = document.getElementById("resize_track");
            //console.log(tracker);
            let rect = data.target.getBoundingClientRect();
            let x = data.clientX - rect.x;
            let y = data.clientY - rect.y;
            //console.log(`x:${x} y:${y}`);
            switch (resizemode) {
                case "resize_w":
                    tracker.style.width = `${x}px`;
                    break;
                case "resize_h":
                    tracker.style.height = `${y}px`;
                    break;
                case "resize_wh":
                    tracker.style.width = `${x}px`;
                    tracker.style.height = `${y}px`;
                    break;
                default: break;

            }

        }

    }

    const mouseup = (data) => {
        if (resizemode !== "") {
            let tracker = document.getElementById("resize_track");
            tracker.style.display = "none";
            let rect = data.target.getBoundingClientRect();
            let x = data.clientX - rect.x;
            let y = data.clientY - rect.y;
            switch (resizemode) {
                case "resize_w":
                    setWidth(x);
                    break;
                case "resize_h":
                    setHeight(y);
                    break;
                case "resize_wh":
                    setWidth(x);
                    setHeight(y);
                    break;
                default: break;

            }
            resizemode = "";
        }
    }

    let edittrack = false;
    const editTrackdown = (e) => {
        console.log("editTrackdown");
        edittrack = true;
        //console.log(e);
        // let rect = e.target.getBoundingClientRect();
        // let x = e.clientX - rect.x;
        // let y = e.clientY - rect.y;
        // e.target.style.left = `${x}px`;
        // e.target.style.left = `${x}px`;
    }

    // const editTrackmove = (e) => {
    //     let rect = e.target.getBoundingClientRect();
    //     let x = e.clientX - rect.x;
    //     let y = e.clientY - rect.y;
    //     let edit_track = document.getElementById("edit_track");
    //     //edit_track.style.left = `${x}px`;
    //     //edit_track.style.top = `${y}px`;
    //     console.log(`x:${x} y:${y}`);
    // }



    return (
        <div className="box">
            <div className="row header">
                Riibon
            </div>
            <div className="row content" onMouseMove={(e) => mousemove(e)} onMouseUp={(e) => mouseup(e)} id="paint">
                <div style={{ position: "relative", background: "purple", width: `${width + 10}px`, height: `${height + 10}px`, marginTop: "5px", marginLeft: "5px" }}>
                    <div style={{ clipPath: "inset(0px 0px 0px 0px)", position: "absolute", width: `${width + 10}px`, height: `${height + 10}px` }}>
                        <div onMouseDown={(e) => mousedown(e, "resize_wh")} style={{ position: "absolute", width: "10px", height: "10px", background: "white", border: "1px solid black", left: `${width}px`, top: `${height}px`, cursor: "nw-resize" }} id="resize_wh"></div>
                        <div onMouseDown={(e) => mousedown(e, "resize_h")} style={{ position: "absolute", width: "10px", height: "10px", background: "white", border: "1px solid black", left: `${width / 2 - 10}px`, top: `${height}px`, cursor: "n-resize" }} id="resize_h"></div>
                        <div onMouseDown={(e) => mousedown(e, "resize_w")} style={{ position: "absolute", width: "10px", height: "10px", background: "white", border: "1px solid black", left: `${width}px`, top: `${height / 2 - 10}px`, cursor: "e-resize" }} id="resize_w"></div>
                        <canvas ref={canvas} style={{ position: "absolute", display:"none"}} width={`${width}px`} height={`${height}px`}></canvas>
                    </div>
                    <div id="edit_track" style={{ position: "absolute", left: "20px", top: "10px", height: "100px", width: "200px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr", width: "200px", height: "200px" }}>
                            <div onMouseDown={(e) => editTrackdown(e)} style={{ gridColumn: "1 / 4", gridRow: "1 / 4", margin: "5px", border: "1px solid #0078D7", borderStyle: "dashed", cursor: "move" }}></div>
                            <div style={{ gridColumn: "1", gridRow: "1", alignSelf: "start", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px" }}></div>
                            <div style={{ gridColumn: "2", gridRow: "1", alignSelf: "start", justifySelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px" }}></div>
                            <div style={{ gridColumn: "3", gridRow: "1", alignSelf: "start", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px" }}></div>
                            <div style={{ gridColumn: "1", gridRow: "2", alignSelf: "center", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px" }}></div>
                            <div style={{ gridColumn: "3", gridRow: "2", alignSelf: "center", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px" }}></div>
                            <div style={{ gridColumn: "1", gridRow: "3", alignSelf: "end", justifySelf: "start", border: "1px solid black", background: "white", width: "10px", height: "10px" }}></div>
                            <div style={{ gridColumn: "2", gridRow: "3", alignSelf: "end", justifySelf: "center", border: "1px solid black", background: "white", width: "10px", height: "10px" }}></div>
                            <div style={{ gridColumn: "3", gridRow: "3", alignSelf: "end", justifySelf: "end", border: "1px solid black", background: "white", width: "10px", height: "10px" }}></div>
                        </div>
                    </div>
                    <div id="resize_track" style={{ position: "absolute", width: "498px", height: "298px", border: "1px solid black", borderStyle: "dashed", display: "none" }}></div>
                </div>

                {/* <div style={{display:"grid", gridColumn:"auto, 20px", gridRow:"auto 20px", marginLeft:"5px", marginTop:"5px", backgroundColor:"blue", alignContent:"left", justifyContent:"start"}}>
                    <canvas onMouseMove={(e)=>canvas_Mousemove(e)} ref={canvas} style={{width:"300px", height:"300px", gridRow:"1", gridColumn:"1"}} ></canvas>
                    <div style={{background:"green", gridColumn:"1 / 3", gridRow:"1 / 3"}}></div>
                    <div onMouseDownCapture={(e)=>mousedown(e)} onMouseMoveCapture={(e)=>mousemove(e)} style={{left:"100px", width:"20px", gridColumn:"2", gridRow:"2", height:"20px", background:"red", cursor:"se-resize"}}></div>
                    <div style={{width:"20px", gridColumn:"1", gridRow:"2", height:"20px", alignSelf:"center", justifySelf:"center", background:"red", cursor:"s-resize"}}></div>
                    <div style={{width:"20px", gridColumn:"2", gridRow:"1", alignSelf:"center", height:"20px", background:"red", cursor:"w-resize"}}></div>                  
                </div>          */}
            </div>
            <div className="row footer">
                status bar
            </div>
        </div>
    )

}