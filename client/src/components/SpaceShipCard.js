import {React, useState} from 'react';
import Button from 'react-bootstrap/Button';

function SpaceShipCard({spaceship}) {   
    
    
    const {id, name, image } = spaceship

    console.log(image)
    
    

    return(
        <div> 
            <div className= 'card'> 
            <div class='card-body'>

                <h1 class='card-title'>{name}</h1>
                <img src={image} alt={name}/>
            </div>
            
            </div>
        </div>
    )
}

export default SpaceShipCard;
