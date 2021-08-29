/* eslint-disable no-unused-vars */
import { useCallback } from "react";
import { useState, useRef } from "react";

export const useRect = (maxRect) => {
  // const [x, setX] = useState(0);
  // const [width, setWidth] = useState(0);
  // const [y, setY] = useState(0);
  // const [height, setHeight] = useState(0);

  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0, show: false })
  //const [isshow, setIsShow] = useState(false)

  const rect_temp = useRef({ left: 0, top: 0, right: 0, bottom: 0, show: false })
  const setBegin = (x, y, width=0, height=0) => {
    rect_temp.current.left = x;
    rect_temp.current.top = y;
    rect_temp.current.right = x+width;
    rect_temp.current.bottom = y+height;
    rect_temp.current.show = true;
    change();
  }

  const setMove = (x, y, isShow = true) => {
    rect_temp.current.right = x;
    rect_temp.current.bottom = y;
    rect_temp.current.show = isShow;
    change();
  }

  const setEnd = (isShow = false) => {
    rect_temp.current.show = isShow;
    change();
  }

  //const xx = useRef(0);
  const change = () => {

    //console.log(`change left:${rect_temp.current.left} top:${rect_temp.current.top} right:${rect_temp.current.right} bottom:${rect_temp.current.bottom} ishsow:${rect_temp.current.show}`);
    // if (rect_temp.current.left > rect_temp.current.right) {
    //   setX(rect_temp.current.right);
    // }
    // else {
    //   setX(rect_temp.current.left);
    // }
    // if (rect_temp.current.top > rect_temp.current.bottom) {
    //   setY(rect_temp.current.bottom);
    // }
    // else {
    //   setY(rect_temp.current.top);
    // }
    // setWidth(Math.abs(rect_temp.current.left - rect_temp.current.right));
    // setHeight(Math.abs(rect_temp.current.top - rect_temp.current.bottom));


    //console.log(JSON.stringify(maxRect));

    
    setRect(obj => {
      return {
        ...obj,
        x: rect_temp.current.left > rect_temp.current.right ? rect_temp.current.right : rect_temp.current.left,
        y: rect_temp.current.top > rect_temp.current.bottom ? rect_temp.current.bottom : rect_temp.current.top,
        width: Math.abs(rect_temp.current.left - rect_temp.current.right),
        height: Math.abs(rect_temp.current.top - rect_temp.current.bottom),
        show: rect_temp.current.show
      }
    });
    // console.log(`xx:${xx.current}`);
    // console.log(rect);
  }

  return [rect, setBegin, setMove, setEnd];
}