/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import {Calendar} from './Calendar'

function App() {
  const greeting = 'Hello Function Component!';
  function onSelectCahnge(date){
    console.log(date)
  }
  return (
    <Calendar onSelectCahnge={(date)=>onSelectCahnge(date)}/>

  );


}

 

export default App;
