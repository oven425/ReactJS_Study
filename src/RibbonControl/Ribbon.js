import { useEffect, useState } from "react"
import { Children } from "react"
import './Ribbon.css'

export const RibbonButton = (props) => {
    // console.log("RibbonButton");
     console.log(props.lable);
     console.log(props.largsource);
     console.log(props.smallsource);
    //console.log(`RibbonButton ${lable}`)
    return (
        <div>
            <img src={props.smallsource} atl="123"></img>
            {props.lable}
        </div>
    )
}

export const RibbonGroup = (props) => {
    console.log("RibbonGroup");
    console.log(props);
    return (
        <div className="ribbongroup">
            <div className="content">
                {/* {props.children} */}
                {
                Children.toArray(props.children).map((props, index) => {
                    return (
                        <div key={index}>{props}</div>
                    )
                })
            }
            </div>
            <div className="splitline"></div>
            <div className="title">{props.lable}</div>
        </div>
    )
}

export const RibbonTabItem = (props) => {
    return (
        <div className="ribbontabitem">
            {/* {
                props.children.map((props, index) => {
                    return (
                        <div key={index}>{props}</div>
                    )
                })
            } */}
            {
                Children.toArray(props.children).map((props, index) => {
                    return (
                        <div key={index}>{props}</div>
                    )
                })
            }
        </div>
    )
}

export const RibbonTab = (props) => {
    // //console.log(React.Children.toArray(props.Children));
    // //const arrayChildren = Children.toArray(props.children);

    // const [tabIndex, setTabIndex] = useState(0);
    // const tabitemchange = (e, index) => {
    //     setTabIndex(index);
    // }
    // return (
    //     <div>
    //         <div>
    //             <div style={{ display: "flex" }}>
    //                 {/* {
    //                     props.children.map((props, index) => {
    //                         return (
    //                             <div key={index} onClick={(e) => { tabitemchange(e, index) }}>{props.props.title}</div>
    //                         )
    //                     })
    //                 } */}
    //                 {
    //                     Children.toArray(props.children).map((props, index) => {
    //                         return (
    //                             <div key={index} onClick={(e) => { tabitemchange(e, index) }}>{props.props.title}</div>
    //                         )
    //                     })
    //                 }
    //             </div>
    //         </div>
    //         <div>
    //             {
    //                 Children.toArray(props.children)[tabIndex]
    //             }
    //             {/* {props.children[tabIndex]} */}
    //         </div>
    //     </div>
    // )

    return (
        <div className="ribbontab">

            {
                Children.toArray(props.children).map((props, index) => {
                    return (
                        <div key={index}>{props}</div>
                    )
                })
            }
        </div>
    )
}


export const Ribbon = (props) => {
    console.log(props)
    const [tabIndex, setTabIndex] = useState(0);
    const tabitemchange = (e, index) => {
        setTabIndex(index);
    }
    return (
        <div>
            <div style={{display:"flex"}}>
            {
                        Children.toArray(props.children).map((props, index) => {
                            return (
                                <div key={index} onClick={(e) => { tabitemchange(e, index) }}>{props.props.lable}</div>
                            )
                        })
                    }
            </div>
           {
               Children.toArray(props.children)[tabIndex]
           }
        </div>
    )
}

