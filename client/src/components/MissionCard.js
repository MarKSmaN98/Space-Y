import React from 'react';


function MissionCard({mission}) {

    return(
        <div>
            <h1 class = 'card title'>Mission Assignment Number: {mission['mission id']}</h1>
            <div class='card-body'>
                <h2>Astronaut Assigned: {mission.astronaut.name}</h2>
                <h2>SpaceShip Assignment: {mission.spaceship.name}</h2>
            </div>
        </div>
    )
}

export default MissionCard