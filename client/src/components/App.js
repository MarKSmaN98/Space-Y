import React, { useEffect, useState } from "react";
// import { Switch, Route } from "react-router-dom";

function App() {

const [data, setData] = useState([])

useEffect(() => { 
  fetch("/astronauts")
    .then(res=> res.json())
    .then(data => {
      setData(data)
      console.log(data)
    })
}, [])

//comment


return (<div>
  <h1>Hello</h1>
</div>)


}

export default App;
