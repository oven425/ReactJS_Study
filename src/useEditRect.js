/* eslint-disable no-unused-vars */
import { useState, useRef } from "react"
export const ResizeTypes = {
    none: 'none',
    left_top: 'left_top',
    top: 'top',
    top_right: 'top_right',
    right: 'right',
    right_bottom: 'right_bottom',
    bottom: 'bottom',
    left_bottom: 'left_bottom',
    left: 'left',
};
export const useResizeRect = () => {
    const resizeType = useRef(ResizeTypes.none);
    const [rect, setRect] = useState({ x: 0, y: 0, width: 0, height: 0, show: false });
    //let resizeType = ResizeTypes.left;
    const resizeBegin = (type, x, y, width, height) => {
        resizeType.current = type;
        console.log(resizeType.current);
        setRect({ x: x, y: y, width: width, height: height, show: true });
    }
    const resizeMove = (x, y) => {
        console.log(resizeType.current);
        let left = rect.x;
        let top = rect.y;
        let right = left + rect.width;
        let bottom = top + rect.height;
        switch (resizeType.current) {
            case ResizeTypes.left_top:
                setRect(obj => {
                    return {
                        ...obj,
                        x: x,
                        y: y,
                        width: right - x,
                        height: bottom - y
                    }
                });
                break;
            case ResizeTypes.top:
                setRect(obj => {
                    return {
                        ...obj,
                        y: y,
                        height: bottom - y
                    }
                });
                break;
            case ResizeTypes.right:
                break;
            default: break;
        }
    }
    const resizeEnd = () => {
        setRect(obj => {
            return {
                ...obj,
                show: false
            }
        });
    }
    return [rect, resizeBegin, resizeMove, resizeEnd];
}

export const useEditRect = () => {
    const [edit, setEdit] = useState({ x: 0, y: 0, width: 0, height: 0, show: false });
    let dragBegin = { x: 0, y: 0 };
    const dragEditBegin = (x, y) => {
        dragBegin.x = x;
        dragBegin.y = y;
    }
    const dragEditMove = (x, y) => {

    }
    const dragEditEnd = () => {

    }


    return [edit, dragEditBegin, dragEditMove, dragEditEnd];
}