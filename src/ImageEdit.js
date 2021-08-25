/* eslint-disable no-unused-vars */
import { red } from "@material-ui/core/colors";
import { useMemo } from "react";
import { useState } from "react";
import { useRef, useEffect } from "react"
import './ImageEdit.css'

export const ImageEdit = () => {
    const canvas = useRef();
    const [width, setWidth] = useState(640);
    const [height, setHeight] = useState(480);
    const [selectTrack, setSelectTrack] = useState({ left: 10, top: 10, right: 50, bottom: 50, isshow: false });
    const [editTrack, setEditTrack] = useState({ left: 10, top: 10, right: 50, bottom: 50, isshow: false, limitrect:{ left: 10, top: 10, right: 50, bottom: 50} });
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

    let canvas_rect = { left: 0, top: 0, right: 0, bottom: 0 };
    const canvas_Mousedown = (data) => {
        console.log(canvas.current.style.left);
        canvas_rect.left = parseInt(canvas.current.style.left);
        canvas_rect.top = parseInt(canvas.current.style.top);
        canvas_rect.right = canvas_rect.left+canvas.current.width;
        canvas_rect.bottom = canvas_rect.top+canvas.current.height;
        console.log(canvas_rect);
        let select_track = document.getElementById("select_track");
        let paint = document.getElementById("paint");
        let rect = paint.getBoundingClientRect();
        let x = data.clientX - rect.x - 5;
        let y = data.clientY - rect.y - 5;
        setSelectTrack({ left: x, top: y, right: x, bottom: y, isshow: true, limitrect:{left: canvas_rect.left, top: canvas_rect.top, right: canvas_rect.right, bottom: canvas_rect.bottom} });
        console.log(`canvas_Mousedown x:${x} y:${y}`);
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
        if (selectTrack.isshow === true) {
            console.log(selectTrack);
            let paint = document.getElementById("paint");
            let rect = paint.getBoundingClientRect();
            let x = data.clientX - rect.x - 5;
            let y = data.clientY - rect.y - 5;
            console.log(`x:${x} y:${y}`);
            if(x < canvas_rect.left){
                console.log("if(x < canvas_rect.left)");
                x= canvas_rect.left;
            }
            else if(x>canvas_rect.right){
                console.log("(x>canvas_rect.right");
                x= canvas_rect.right;
            }
            setSelectTrack(prevState => {
                return { ...prevState, ...{ right: x, bottom: y } };
            });

        }
        else if (edittrack === true) {
            let paint = document.getElementById("paint");
            let rect = paint.getBoundingClientRect();
            let x = data.clientX - rect.x;
            let y = data.clientY - rect.y;
            let tracker = document.getElementById("edit_track");
            tracker.style.left = `${x}px`;
            tracker.style.top = `${y}px`;
            if (x <= 1 || y <= 1) {
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
        if (selectTrack.isshow === true) {
            setSelectTrack(x => { return { ...x, ...{ isshow: false } }; });
        }
        else if (resizemode !== "") {
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
                        <canvas onMouseDown={(e) => canvas_Mousedown(e)} ref={canvas} style={{ position: "absolute", left:"0px", top:"0px" }} width={`${width}px`} height={`${height}px`}></canvas>
                    </div>
                    <div id="select_track" disabled style={{ left: `${(selectTrack.left>selectTrack.right?selectTrack.right:selectTrack.left)}px`, top: `${selectTrack.top>selectTrack.bottom?selectTrack.bottom:selectTrack.top}px`, width: `${Math.abs(selectTrack.right - selectTrack.left)}px`, height: `${Math.abs(selectTrack.bottom - selectTrack.top)}px`, display: `${selectTrack.isshow ? "block" : "none"}`, position: "absolute", border: "1px solid black", borderStyle: "dashed" }}></div>
                    <div id="edit_track" style={{ position: "absolute", left: "20px", top: "10px", height: "100px", width: "200px", display: "block" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr" }}>
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
            </div>
            <div className="row footer">
                status bar
            </div>
        </div>
    )

}