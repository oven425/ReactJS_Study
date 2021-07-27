/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
//https://w3c.github.io/mediacapture-image/#mediatracksupportedconstraints-section
export const MediaCapture = () => {
    const webcam = useRef()
    const snapshotImage = useRef()
    // useEffect(()=>{
    //     const stream = await navigator.mediaDevices.getUserMedia({
    //         video: {pan: true, tilt: true, zoom: true},
    //       });
    // },[])

    useEffect(() => {
        console.log("useEffect open--")
        open()
        console.log("useEffect open 1")
        return (() => {
            console.log("useEffect open----")
        })
    });

    let imageCapture;
    async function open() {
        console.log("open--")
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { pan: true, tilt: true, zoom: true },
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
            width: "500px",
            border: "1px #333 solid"
        }}>
            <video ref={webcam} id="video" style={{
                width: "500px",
                height: "375px",
                background: "#666"
            }} autoPlay></video>
            <label>
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
            {/* <input type="checkbox">Record</input> */}
            <label>WB</label>
            <select>
                <option></option>
            </select>
        </div>

    )
}