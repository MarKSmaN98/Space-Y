import React from "react";
import Button from 'react-bootstrap/Button';


function AstronautCard({astro}) {
    let {name, age, weight} = astro

    console.log(name, age, weight)

    return(
        <div>

            <div className='card'>
            <div class='card-body'>
                <h1 class='card-title'>{name}</h1>
                <p>{age}</p>
                <p>{weight}</p>
                <Button>Remove</Button>
                <Button>Modify</Button>
            </div>
            </div>
        </div>
        
    )
}

export default AstronautCard