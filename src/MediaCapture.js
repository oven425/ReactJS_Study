/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
//https://w3c.github.io/mediacapture-image/#mediatracksupportedconstraints-section
export const MediaCapture = () => {
    const webcam = useRef()
    const snapshotImage = useRef()
    const canvas1 = useRef();
    useEffect(()=>{
        console.log("useEffect 1");
        async function open() {
            console.log("open--")
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: false,
                video: { facingMode: "user" },
            });
            webcam.current.srcObject = stream;
    
            const [track] = stream.getVideoTracks();
            console.log(track)
            //imageCapture = new ImageCapture(track);
            const capabilities = track.getCapabilities();
            const settings = track.getSettings();
            console.log("capabilities")
            console.log(capabilities)
            console.log("settings")
            console.log(settings)
            //imageCapture = new ImageCapture(track);
    
            console.log("open----")
            getFrameFromVideo(webcam.current, canvas1.current);
        }
        console.log("useEffect 2");
        open();
        console.log("useEffect 3");
    },[])

//     useEffect(() => {
//         console.log("useEffect open--")
//         open();
//         if (canvas1.current.getContext) { //判斷是否支援
//             var ctx = canvas1.current.getContext('2d');
//             //宣告ctx渲染方式
          
//             ctx.fillStyle = "rgb(200,0,0)"; //正方形的填滿色彩
//   ctx.fillRect (10, 10, 130, 130); //繪製一個填滿色彩的正方形
//   ctx.clearRect(20, 20, 110, 110); //摟空一個正方形區域

//   ctx.strokeStyle = "rgb(0,200,0)"; //正方形線段的色彩
//   ctx.strokeRect(40, 40, 70, 70); //畫一個正方形線段
          
//           }else {
//             alert('your browser not support canvas')
//             //如果不支援
//           };
//            getFrameFromVideo(webcam.current, canvas1.current);
//         console.log("useEffect open 1")
//         return (() => {
//             console.log("useEffect open----")
//         })

//     });

    const getFrameFromVideo = (video, canvas) => {
        
        const ctx = canvas.getContext("2d");
        //console.log(`width:${video.width}  height:${video.height}`);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();   //儲存狀態
        ctx.translate(640, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, 640, 480);
        ctx.restore(); //到此才輸出，才不會還沒整體操作完就放出，會造成畫面快速抖動
        requestAnimationFrame(() => getFrameFromVideo(video, canvas));
      };

    let imageCapture;
    async function open() {
        console.log("open--")
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { facingMode: "user" },
        });
        webcam.current.srcObject = stream;

        const [track] = stream.getVideoTracks();
        console.log(track)
        imageCapture = new ImageCapture(track);
        const capabilities = track.getCapabilities();
        const settings = track.getSettings();
        console.log("capabilities")
        console.log(capabilities)
        console.log("settings")
        console.log(settings)
        //imageCapture = new ImageCapture(track);

        console.log("open----")
    }

    async function takePhoto() {
        try {
            const blob = await imageCapture.takePhoto();
            console.log("Photo taken: " + blob.type + ", " + blob.size + "B");

            //const image = document.querySelector('img');
            //image.src = URL.createObjectURL(blob);
        } catch (err) {
            console.error("takePhoto() failed: ", err);
        }
    }

    async function snapShot() {
        const blob = await imageCapture.takePhoto();
        console.log("snapShot taken: " + blob.type + ", " + blob.size + "B");
        //           console.log(URL.createObjectURL(blob))
        // snapshotImage.current.src = URL.createObjectURL(blob);

    }

    function startRecord() {
        //MediaRecorder
    }

    function stopRecord() {

    }

    function photoMode(){
        console.log("photoMode");
    }

    function recordMode(){
        console.log("recordMode");
    }


    return (
        <div style={{
            width: "640px",
            border: "1px #333 solid"
        }}>
            <video ref={webcam} id="video" style={{
                width: "640px",
                height: "480px",
                background: "#666"
            }} autoPlay></video>
            <canvas width="640" height="480" ref={canvas1} style={{border:"blue solid 1px"}}>
            你的浏览器不支持 canvas，请升级你的浏览器。
            </canvas>
            
            {/* <label>
                <input type="radio" value="aaa" name="gender" onClick={()=>photoMode()} />
                <span>Photo</span>
            </label>
            <label>
                <input type="radio" value="aaa" name="gender" onClick={()=>recordMode()} />
                <span>Record</span>
            </label>
            <button onClick={async () => await snapShot()}>Snapshot</button>
            <img ref={snapshotImage} alt="BigCo Inc. logo" style={{
                width: "100px",
                height: "200px",
                border: "1px #333 solid"
            }}></img>
            <label>WB</label>
            <select>
                <option></option>
            </select> */}
        </div>

    )
}