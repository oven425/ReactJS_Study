/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"

export const MediaCapture = () => {
    const webcam = useRef()
    useEffect(() => {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
              .then(function (stream) {
                webcam.current.srcObject = stream;
              })
              .catch(function (err0r) {
                console.log("Something went wrong!");
              });
          }
    }, [])
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
            }} autoPlay="true"></video>
        </div>

    )
}