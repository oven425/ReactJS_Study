/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
//https://w3c.github.io/mediacapture-image/#mediatracksupportedconstraints-section
export const MediaCapture = () => {
    const webcam = useRef()
    // useEffect(()=>{
    //     const stream = await navigator.mediaDevices.getUserMedia({
    //         video: {pan: true, tilt: true, zoom: true},
    //       });
    // },[])

    useEffect(() => {
        console.log("useEffect open--")
        open()
        console.log("useEffect open 1")
        return(()=>{
            console.log("useEffect open----")
        })
    }, []);

    let imageCapture;
    async function open() {
        console.log("open--")
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { pan: true, tilt: true, zoom: true },
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


    return (
        <div style={{
            margin: "0px auto",
            width: "500px",
            height: "375px",
            border: "10px #333 solid"
        }}>
            <video ref={webcam} id="video" style={{
                width: "500px",
                height: "375px",
                background: "#666"
            }} autoPlay></video>
            <label>WB</label>
            <select></select>
        </div>

    )
}