import { useState } from "react"

export const RibbonGroup=(props)=>{
    return(
        <div style={{border:"1px solid red", display:"flex"}}>
            {props.children}
            <div style={{width:"1px", background:"black", justifySelf:"stretch"}}></div>
        </div>
    )
}

export const RibbonTabItem=(props)=>{
    return(
        <div>
            {props.children}
        </div>
    )
}

export const RibbonTab=(props)=>{
    const [tabIndex, setTabIndex]=useState(1);
    const tabitemchange=(e,index)=>{
        console.log(e);
        console.log(index);
        setTabIndex(index);
    }
    return(
        <div>
            <div>
                <div style={{display:"flex"}}>
                    {
                        props.children.map((props,index)=>{
                            return(
                                <div key={index} onClick={(e)=>{tabitemchange(e,index)}}>{props.props.title}</div>
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


export const Ribbon=(props)=>{
    return(
        <div>
            {props.children}
        </div>
    )
}

