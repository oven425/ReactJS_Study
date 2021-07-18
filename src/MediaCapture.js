/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
//https://w3c.github.io/mediacapture-image/#mediatracksupportedconstraints-section
export const MediaCapture = () => {
    const webcam = useRef()
    useEffect(()=>{
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {pan: true, tilt: true, zoom: true},
          });
    },[])
    // useEffect(() => {
    //     if (navigator.mediaDevices.getUserMedia) {
    //         // navigator.mediaDevices.enumerateDevices()
    //         //     .then(function (devices) {
    //         //         devices.forEach(function (device) {
    //         //             console.log(device.kind + ": " + device.label +
    //         //                 " id = " + device.deviceId);
    //         //         });
    //         //     })
    //         //     .catch(function (err) {
    //         //         console.log(err.name + ": " + err.message);
    //         //     });

    //             // let supportedConstraints = navigator.mediaDevices.getSupportedConstraints();

    //             // for (let constraint in supportedConstraints) {
    //             //   if (supportedConstraints.hasOwnProperty(constraint)) {
    //             //     console.log(constraint)
    //             //   }
    //             // }

    //         // navigator.mediaDevices.getUserMedia({ video: true })
    //         //     .then(function (stream) {
    //         //         webcam.current.srcObject = stream;
    //         //     })
    //         //     .catch(function (err0r) {
    //         //         console.log("Something went wrong!");
    //         //     });
    //     }
    // }, [])
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
        </div>

    )
}