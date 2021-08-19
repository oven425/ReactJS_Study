/* eslint-disable no-unused-vars */
import { red } from "@material-ui/core/colors";
import { useRef, useEffect } from "react"
import './ImageEdit.css'

export const ImageEdit = () => {
    // const canvas = useRef();

    // useEffect(() => {
    //     fillRect(100, 100, 100, 100);
    // }, []);

    // const fillRect = (x, y, width, height) => {

    //     const ctx = canvas.current.getContext("2d");
    //     //console.log(`width:${video.width}  height:${video.height}`);
    //     ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    //     ctx.save();   //儲存狀態
    //     ctx.fillStyle = '#ffffff';
    //     //ctx.fillRect(x, y, width, height);
    //     ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

    //     ctx.restore(); //到此才輸出，才不會還沒整體操作完就放出，會造成畫面快速抖動
    // };



    const canvas_Mousemove = (data) => {
        //var rect = data.target.getBoundingClientRect();
        //console.log(rect);

        //console.log(`x:${data.clientX-rect.x} y:${data.clientY-rect.y}`);
        //console.log(data);
    }

    const mousedown = (data) => {
        console.log(`down ${data}`);
    }

    const mousemove = (data) => {
        console.log(`move ${data}`);
    }

    const mouseup = (data) => {
        console.log(`up ${data}`);
    }



    return (
        <div className="box">
            <div className="row header">
                Riibon
            </div>
            <div className="row content">
                <div style={{position:"relative", width:"400px", height:"200px", background:"purple", marginTop:"5px", marginLeft:"5px"}}>
                    <div style={{position:"absolute", width:"10px", height:"10px", background:"red", left:"400px", top:"200px"}}></div>
                    <div style={{position:"absolute", width:"10px", height:"10px", background:"red", left:"200px", top:"200px"}}></div>
                    <div style={{position:"absolute", width:"10px", height:"10px", background:"red", left:"400px", top:"100px"}}></div>
                    <div style={{position:"absolute", width:"400px", height:"200px", background:"blue"}}></div>
                    <div style={{position:"absolute", width:"398px", height:"198px", border:"1px solid black", borderStyle:"dashed"}}></div>
                    {/* <div class="b">This div element has position: absolute and left: auto.</div> */}
                    {/* <div class="c">This div element has position: absolute and is placed 150 pixels to the right of the LEFT edge of the containing positioned element.</div> */}
                </div>
                {/* <div stype={{position:"relative"}}>
                    <canvas ref={canvas} style={{ width: "300px", height: "300px", marginLeft: "5px", marginTop: "5px" }}></canvas>
                    <div style={{ background: "red", position: "absolute", left: "155px", top: "5px", width: "10px", height: "10px" }}></div>
                </div> */}

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