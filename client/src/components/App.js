import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SpaceShips from './SpaceShips';
import Missions from './Missions';
import Astronauts from './Astronauts';
import NavBar from './NavBar'


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
  <NavBar />
  <Switch>
    <Route exact path = '/'>
      <Astronauts/>
    </Route>
    <Route path = '/spaceships'>
      <SpaceShips />
    </Route>
    <Route path = "/missions">
      <Missions />
    </Route>
  </Switch>
</div>)


}

export default App;
