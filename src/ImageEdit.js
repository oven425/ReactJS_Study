/* eslint-disable no-unused-vars */
import { red } from "@material-ui/core/colors";
import { useRef, useEffect } from "react"
import './ImageEdit.css'

export const ImageEdit = () => {
    const canvas=useRef();

    useEffect(()=>{
        fillRect(100,100,100,100);
    },[]);

    const fillRect = (x, y, width, height) => {

        const ctx = canvas.current.getContext("2d");
        //console.log(`width:${video.width}  height:${video.height}`);
        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
        ctx.save();   //儲存狀態
        ctx.fillStyle = '#ffffff';
        //ctx.fillRect(x, y, width, height);
        ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
        
        ctx.restore(); //到此才輸出，才不會還沒整體操作完就放出，會造成畫面快速抖動
    };



    const canvas_Mousemove = (data)=>{
        //var rect = data.target.getBoundingClientRect();
        //console.log(rect);
        
        //console.log(`x:${data.clientX-rect.x} y:${data.clientY-rect.y}`);
        //console.log(data);
    }

    return (
        <div className="box">
            <div className="row header">
                Riibon
            </div>
            <div className="row content">
                <div style={{display:"grid", gridColumn:"auto, 20px", marginLeft:"5px", marginTop:"5px", backgroundColor:"blue", width:"320px", height:"320px"}}>
                    <canvas onMouseMove={(e)=>canvas_Mousemove(e)} ref={canvas} width="300px" height="300px"></canvas>
                    <div style={{width:"20px", gridColumn:"2", gridRow:"2", height:"20px", background:"red", cursor:"se-resize"}}></div>
                    <div style={{width:"20px", gridColumn:"1", gridRow:"2", justifySelf:"center", height:"20px", background:"red", cursor:"s-resize"}}></div>
                    <div style={{width:"20px", gridColumn:"2", gridRow:"1", alignSelf:"center", height:"20px", background:"red", cursor:"w-resize"}}></div>
                </div>
            </div>
            <div className="row footer">
                status bar
            </div>
        </div>
    )

}