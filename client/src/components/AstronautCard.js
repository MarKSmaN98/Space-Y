import React from "react";
import Button from 'react-bootstrap/Button';


function AstronautCard({astro, removeAstro}) {
    let {id, name, age, weight} = astro
    let intlocation = parseInt(id)

    let dropAstro = () => {
        console.log("clicked remove!")
        console.log(`/astronauts/${intlocation}`)

        fetch(`/astronauts/${intlocation}`, {
            method: 'DELETE',
          })

        removeAstro(id)
    }



    return(
        <div>

            <div className='card'>
            <div class='card-body'>
                <h1 class='card-title'>{name}</h1>
                <p>{age}</p>
                <p>{weight}</p>
                <Button onClick={dropAstro}>Remove</Button>
                <Button>Modify</Button>
            </div>
            </div>
        </div>
        
    )
}

export default AstronautCard