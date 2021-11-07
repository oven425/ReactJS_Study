export const StatusBar = (props) => {
    return (
      <div className="statusbar">
        {props.children}
      </div>
    )
  };
  
  export const StatusBarItem = (props) => {
    return (
      <div className="statusbaritem">
        <div className="statusbaritemsplit"></div>
        {props.children}
      </div>
    )
  }