import {React, useState} from 'react';
import Button from 'react-bootstrap/Button';

function SpaceShipCard({spaceship}) {   
    
    
    const {id, name } = spaceship


    
    

    return(
        <div> 
            <div className= 'card'> 
            <div class='card-body'>

                <h1 class='card-title'>{name}</h1>
                <p> {" image here "} </p>
            </div>
            
            </div>
        </div>
    )
}

export default SpaceShipCard;
