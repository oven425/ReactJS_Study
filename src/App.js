/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import { Calendar } from './Calendar'
import { useState } from 'react';

function App() {
  let greeting = 'Hello Function Component!';
  const onSelectChange1 = (date)=>{
    console.log(`App onSelectChange`)
    console.log(date)
  }
  const handleChange = x => {
    console.log('Headline handleChange')

    console.log(x.target.value)
  }
  const handleChange1 = x => {
    console.log('Headline handleChange1')

    console.log(x)
  }
  return (
    <div>
      <Calendar onSelectChange={onSelectChange1}/>
      <Headline headline={greeting} onChangeHeadline={handleChange} />
      <Headline1 onChangeHeadline={handleChange1} />
    </div>
    
  );
}

export const Headline = ({ headline, onChangeHeadline }) => (
  <div>
    <h1>{headline}</h1>

    <input type="text" value={headline} onChange={onChangeHeadline} />
  </div>
);

export const Headline1= ({ onChangeHeadline }) => (
  <div onClick={onChangeHeadline}>
    12345
  </div>
);






export default App;
