import { useEffect, useState } from "react"
import './Ribbon.css'

export const RibbonGroup = (props) => {
    return (
        <div className="ribbongroup">
            <div style={{ marginLeft: "5px" ,marginRight:"5px" }}>
                {props.children}
            </div>

            <div style={{ width: "5px", height: "100%", background: "black", justifySelf: "stretch", gridColumnStart: "2", gridRow: "1 / span 2" }}></div>
            {/* <div style={{justifySelf:"center"}}>{props.title}</div> */}
            <div className="title">{props.title}</div>
        </div>
    )
}

export const RibbonTabItem = (props) => {
    // console.log(props.children);
    // useEffect(()=>{
    //     props.children.map((props,index)=>{
    //         console.log(props.children);
    //         return props
    //     })
    // },[])

    return (
        <div className="ribbontabitem">
            {
                props.children.map((props, index) => {
                    return (
                        <div key={index}>{props}</div>
                    )
                })
            }
            {/* {props.children} */}
        </div>
    )
}

export const RibbonTab = (props) => {
    //console.log(props.children)
    const [tabIndex, setTabIndex] = useState(0);
    const tabitemchange = (e, index) => {
        console.log(e);
        console.log(index);
        setTabIndex(index);
    }
    return (
        <div>
            <div>
                <div style={{ display: "flex" }}>
                    {
                        props.children.map((props, index) => {
                            return (
                                <div key={index} onClick={(e) => { tabitemchange(e, index) }}>{props.props.title}</div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                {props.children[tabIndex]}
            </div>
        </div>
    )
}


export const Ribbon = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

