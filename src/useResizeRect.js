import { useState, useRef } from "react";

export const useResizeRect = () => {
    const resizeType = useRef(ResizeTypes.none);
    const limit = useRef({ left: 0, top: 0, right: 0, bottom: 0 });
    const [rect, setRect] = useState({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      show: false,
      cursor: "default",
    });
  
    const lastCursor = useRef("default");
    const resizeBegin = (type, x, y, width, height) => {
      resizeType.current = type;
      //lastCursor.current = cursor;
      console.log(resizeType.current);
      let cur_cusrsour = "nw-resize";
      switch (resizeType.current) {
        case ResizeTypes.left_top:
        case ResizeTypes.right_bottom:
          cur_cusrsour = "nw-resize";
          break;
        case ResizeTypes.bottom:
        case ResizeTypes.top:
          cur_cusrsour = "n-resize";
          break;
        case ResizeTypes.left:
        case ResizeTypes.right:
          cur_cusrsour = "w-resize";
          break;
        case ResizeTypes.top_right:
        case ResizeTypes.left_bottom:
          cur_cusrsour = "sw-resize";
          break;
        default:
          break;
      }
      limit.current.left = x;
      limit.current.top = y;
      limit.current.right = x + width;
      limit.current.bottom = y + height;
      setRect({
        x: x,
        y: y,
        width: width,
        height: height,
        show: true,
        cursor: cur_cusrsour,
      });
      console.log(`resizeBegin cursor:${cur_cusrsour}`);
    };
    const resizeMove = (x, y) => {
      //console.log(resizeType.current);
      let left = rect.x;
      let top = rect.y;
      let right = left + rect.width;
      let bottom = top + rect.height;
      let check_x = x;
      let check_y = y;
      switch (resizeType.current) {
        case ResizeTypes.left_top:
          if (x >= limit.current.right) {
            x = limit.current.right;
          }
          if (y >= limit.current.bottom) {
            y = limit.current.bottom;
          }
          setRect((obj) => {
            return {
              ...obj,
              x: x,
              y: y,
              width: right - x,
              height: bottom - y,
            };
          });
          break;
        case ResizeTypes.top:
          if (y >= limit.current.bottom) {
            y = limit.current.bottom;
          }
          setRect((obj) => {
            return {
              ...obj,
              y: y,
              height: bottom - y,
            };
          });
          break;
        case ResizeTypes.top_right:
          if (y >= limit.current.bottom) {
            y = limit.current.bottom;
          }
          setRect((obj) => {
            return {
              ...obj,
              y: y,
              width: x - left,
              height: bottom - y,
            };
          });
          break;
        case ResizeTypes.right:
          setRect((obj) => {
            return {
              ...obj,
              width: x - left,
            };
          });
          break;
        case ResizeTypes.right_bottom:
          setRect((obj) => {
            return {
              ...obj,
              width: x - left,
              height: y - top,
            };
          });
          break;
        case ResizeTypes.bottom:
          setRect((obj) => {
            return {
              ...obj,
              height: y - top,
            };
          });
          break;
        case ResizeTypes.left_bottom:
          if (x >= limit.current.right) {
            x = limit.current.right;
          }
          if (y <= limit.current.top) {
            y = limit.current.top;
          }
          setRect((obj) => {
            return {
              ...obj,
              x: x,
              width: right - x,
              height: y - top,
            };
          });
          break;
        case ResizeTypes.left:
          if (x >= limit.current.right) {
            x = limit.current.right;
          }
          setRect((obj) => {
            return {
              ...obj,
              x: x,
              width: right - x,
            };
          });
          break;
        default:
          break;
      }
    };
    const resizeEnd = () => {
      resizeType.current = ResizeTypes.none;
      setRect((obj) => {
        return {
          ...obj,
          show: false,
        };
      });
    };
    return [rect, resizeBegin, resizeMove, resizeEnd];
  };
  