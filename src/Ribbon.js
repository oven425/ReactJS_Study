/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useState } from "react";

export const Ribbon=({text})=>{
    const [text1, setText1] = useState(text);
    const textchange=(e)=>{
        setText1(e.target.value);
        text = e.target.value;
    }
    useEffect(()=>{
        setText1(text);
    }, [text]);
    return(
        <div>
            <input value={text1} type="text" onChange={(e)=>textchange(e)}></input>
        </div>
    )


}