/* eslint-disable no-unused-vars */
import { useCallback } from "react";
import { useState, useRef } from "react";

export const useSelectRect = () => {
  const limitRect = useRef({left:0,top:0,right:0,bottom:0});

  const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0, show: false })
  //const [isshow, setIsShow] = useState(false)

  const rect_temp = useRef({ left: 0, top: 0, right: 0, bottom: 0, show: false })
  const setBegin = (x, y, width=0, height=0, limit={x:0,y:0,width:0,height:0}) => {
    rect_temp.current.left = x;
    rect_temp.current.top = y;
    rect_temp.current.right = x+width;
    rect_temp.current.bottom = y+height;
    rect_temp.current.show = true;

    limitRect.current.left = limit.x;
    limitRect.current.top = limit.y;
    limitRect.current.right = limit.x+limit.width;
    limitRect.current.bottom = limit.y+limit.height;
    console.log(limitRect.current);
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

    let rc = {left:0,top:0,right:0,bottom:0};
    if(rect_temp.current.left > rect_temp.current.right){
      rc.left = rect_temp.current.right;
      rc.right = rect_temp.current.left;
    }
    else{
      rc.left = rect_temp.current.left;
      rc.right = rect_temp.current.right;
    }
    if(rect_temp.current.top > rect_temp.current.bottom){
      rc.top = rect_temp.current.bottom;
      rc.bottom = rect_temp.current.top;
    }
    else{
      rc.top = rect_temp.current.top;
      rc.bottom = rect_temp.current.bottom;
    }
    console.log(rc);
    if(rc.right >= limitRect.current.right){
      rc.right = limitRect.current.right;
    }
    else if(rc.left<=limitRect.current.left){
      rc.left = limitRect.current.left;
    }
    if(rc.bottom >= limitRect.current.bottom){
      rc.bottom = limitRect.current.bottom;
    }
    else if(rc.top<=limitRect.current.top){
      rc.top = limitRect.current.top;
    }
    
    setRect(obj => {
      return {
        ...obj,
        x: rc.left,
        y: rc.top,
        width: Math.abs(rc.right-rc.left),
        height: Math.abs(rc.bottom-rc.top),
        show: rect_temp.current.show
      }
    });
    // console.log(`xx:${xx.current}`);
    // console.log(rect);
  }

  return [rect, setBegin, setMove, setEnd];
}