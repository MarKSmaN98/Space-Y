import React from 'react';


function MissionCard({mission}) {

    return(
        <div class='card text-center' style={{ width: '51%', margin:'auto'}}>
            <h3 class = 'card title'>Mission Assignment Number: {mission['mission id']}</h3>
            <div class='card-body'>
                <p>Astronaut Assigned: {mission.astronaut.name}</p>
                <p>SpaceShip Assignment: {mission.spaceship.name}</p>
            </div>
        </div>
    )
}

export default MissionCard