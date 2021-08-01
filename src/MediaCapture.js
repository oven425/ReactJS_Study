/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
//https://w3c.github.io/mediacapture-image/#mediatracksupportedconstraints-section
export const MediaCapture = () => {
    const webcam = useRef()
    //const snapshotImage = useRef()
    const canvas1 = useRef();
    const contrast_range = useRef();
    const colorTemperature_range = useRef();
    const whiteBalanceMode_select = useRef();
    const [whiteBalanceModes, setwhiteBalanceModes] = useState([]);

    const videoTrack = useRef();
    const imageCapture = useRef();
    const mediaRecorder = useRef();//new MediaRecorder(stream);

    useEffect(() => {
        console.log("useEffect 1");
        open();
        console.log("useEffect 2");
        return {

        }
    }, [])

    const open = async () => {
        console.log("open--")
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { facingMode: "user" },
        });
        let mediaRecorder1 = new MediaRecorder(stream);
        mediaRecorder.current = mediaRecorder1;
        mediaRecorder.current.ondataavailable = function(e) {
            console.log(e);
            //chunks.push(e.data);
          }
        webcam.current.srcObject = stream;
        //const tracks = stream.getVideoTracks();
        //console.log(tracks);
        videoTrack.current = stream.getVideoTracks()[0];
        // console.log(videoTrack.current)
        const capabilities = videoTrack.current.getCapabilities();
        const settings = videoTrack.current.getSettings();
        console.log("capabilities")
        console.log(capabilities);
        console.log("settings")
        console.log(settings)
        contrast_range.current.max = capabilities.contrast.max;
        contrast_range.current.min = capabilities.contrast.min;
        contrast_range.current.step = capabilities.contrast.step;
        contrast_range.current.value = settings.contrast;
        setwhiteBalanceModes(x => { return []; });
        capabilities.whiteBalanceMode.forEach(element => {
            console.log(element);
            setwhiteBalanceModes(arr => [...arr, element]);
        });
        //console.log(whiteBalanceModes.indexOf(settings.whiteBalanceMode));
        whiteBalanceMode_select.current.value = settings.whiteBalanceMode;

        colorTemperature_range.current.max = capabilities.colorTemperature.max;
        colorTemperature_range.current.min = capabilities.colorTemperature.min;
        colorTemperature_range.current.step = capabilities.colorTemperature.step;
        colorTemperature_range.current.value = settings.colorTemperature;

        let imageCapture1 = new ImageCapture(videoTrack.current);
        imageCapture.current = imageCapture1;
        // imageCapture = new ImageCapture(videoTrack.current);
        // console.log(imageCapture)
        
        console.log("open----")
    }


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

    const snapShot = async()=> {
        try {
            console.log(imageCapture.current);
            const blob = await imageCapture.current.takePhoto();
            console.log("Photo taken: " + blob.type + ", " + blob.size + "B");

            //const image = document.querySelector('img');
            //image.src = URL.createObjectURL(blob);
        } catch (err) {
            console.error("takePhoto() failed: ", err);
        }
    }

    function startRecord() {
        console.log(mediaRecorder.current);
        mediaRecorder.current.start();
    }

    function stopRecord() {
        mediaRecorder.current.stop();
    }

    function photoMode() {
        console.log("photoMode");
    }

    function recordMode() {
        console.log("recordMode");
    }

    function setContrast(data) {
        console.log(data);
        videoTrack.current.applyConstraints({ advanced: [{ contrast: data }] })
    }
    function setColorTemperature_range(data) {
        console.log(data);
        videoTrack.current.applyConstraints({ advanced: [{ colorTemperature: data }] })
    }

    function setWhiteBalanceMode(data) {
        console.log(data);
        videoTrack.current.applyConstraints({ advanced: [{ whiteBalanceMode: data }] })
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
            <canvas width="640" height="480" ref={canvas1} style={{ border: "blue solid 1px", display: "none" }}>
                你的浏览器不支持 canvas，请升级你的浏览器。
            </canvas>
            <div>
                <label>
                    <input type="radio" value="aaa" name="gender" onClick={() => photoMode()} />
                    <span>Photo</span>
                </label>
                <label>
                    <input type="radio" value="aaa" name="gender" onClick={() => recordMode()} />
                    <span>Record</span>
                </label>
            </div>
            <div>
                <button onClick={async() => await snapShot()}>Snapshot</button>
                <button onClick={() => startRecord()}>Start record</button>
                <button onClick={() => stopRecord()}>Stop record</button>
            </div>
            <div>
                <label htmlFor="contrast">Contrast</label>
                <input type="range" id="contrast" ref={contrast_range} onChange={(e) => setContrast(e.target.value)}></input>
            </div>
            <div>
                <label>whiteBalanceMode</label>
                <select ref={whiteBalanceMode_select} onChange={(e) => setWhiteBalanceMode(e.target.value)}>
                    {
                        whiteBalanceModes.map((item, index) => {
                            return (
                                <option value={item} key={index}>{item}</option>
                            )

                        })
                    }
                    {/* <option value="0">continuous</option>
                    <option value="1">manual</option> */}
                </select>
            </div>

            <div>
                <label htmlFor="colorTemperature">ColorTemperature</label>
                <input type="range" id="colorTemperature" ref={colorTemperature_range} onChange={(e) => { setColorTemperature_range(e.target.value) }}></input>
            </div>


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