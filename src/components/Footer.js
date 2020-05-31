import React from 'react';
import '../Style.scss';

const dateOptions = { 
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: "2-digit",
  minute: '2-digit',
  second: "2-digit"
}

function timeCounter(){
  setInterval(()=>{
    var d = new Date();
    document.getElementById("currentTime").innerHTML = d.toLocaleTimeString('en-GB', dateOptions);
  }, 1000)
}

const Footer = ()=> (
    <div className="footer">
      <div id='currentTime'>{timeCounter()}</div>
      
    </div>
)
  
export default Footer
export {dateOptions}