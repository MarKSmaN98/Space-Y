import {React, useState} from 'react';
import Button from 'react-bootstrap/Button';

function SpaceShipCard({spaceship}) {   
    
    
    const {id, name, image } = spaceship

    console.log(image)
    
    

    return(
        <div class="mt-4"> 
            <div class="card text-center" style={{ width: '100%', height: '100%' }}> 
            <div class='card-body'>

                <h1 class='card-title'>{name}</h1>
                <div >
                    <img src={image} alt={name} style={{ width: '100%', height: '100%' }} />
                </div>
                
            </div>
            
            </div>
        </div>
    )
}

export default SpaceShipCard;
