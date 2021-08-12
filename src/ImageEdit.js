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
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();   //儲存狀態
        ctx.fillStyle = '#7cce2b';
        ctx.fillRect(x, y, width, height);
        ctx.restore(); //到此才輸出，才不會還沒整體操作完就放出，會造成畫面快速抖動
    };

    const canvas_Mousemove = (data)=>{
        var rect = data.target.getBoundingClientRect();
        console.log(rect);
        
        console.log(`x:${data.clientX-rect.x} y:${data.clientY-rect.y}`);
    }

    return (
        <div className="box">
            <div className="row header">
                Riibon
            </div>
            <div className="row content">
                <div onMouseMove={(e)=>canvas_Mousemove(e)} style={{marginLeft:"0px", marginTop:"0px", backgroundColor:"red", width:"300px", height:"300px"}}>
                    <canvas ref={canvas} width="300px" height="300px"></canvas>
                </div>
            </div>
            <div className="row footer">
                status bar
            </div>
        </div>
    )

}