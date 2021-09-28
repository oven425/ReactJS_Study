import { useEffect, useState } from "react";

export const useWindowSize=()=>{
    const [size, setSize]=useState({width:0,height:0});
    useEffect(()=>{
        function onResize(){
            setSize({width:window.innerWidth,height:window.innerHeight});
            //console.log(`useWindowSize width:${window.innerWidth} height:${window.innerHeight}`);
        }
        window.addEventListener("resize", onResize);

        return()=>{
            window.removeEventListener("resize", onResize);
        }
    },[]);
    return size;
}