import React, {useEffect, useState} from 'react';
import SpaceShipCard from './SpaceShipCard.js';

function SpaceShips() {

    const [data, setData] = useState([])

    const [formData, setFormData] = useState({
        name: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("/spaceships", {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'name': formData.name
            })
        })
        .then(res => res.json())
        .then(res => {
            setData([...data, res])
        })
    }
    
    useEffect(() => {

        fetch('/spaceships')
            .then(res=> res.json())
            .then(data => {
                setData(data)
            })
    }, [])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]:value})
        console.log(formData)
    }
    
    const spacelist = data.map((spaceship) => {
        return ( <SpaceShipCard key={spaceship.id} spaceship={spaceship}/> )
    })
    
    
    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <div class='form-group'>
                        <label> SpaceShip Name </label>
                        <input onChange={handleChange} class= 'form-control' name='name' id='spaceshipname' placeholder="ex. Rainbow9"/> 
                    </div>
                    <div class="form-group">
                        <label >SpaceShip Image</label>
                        <input name='image' class="form-control" id="spaceshipname" placeholder="URL" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div> 
                {spacelist}
            </div>
        </div>
 
    )
}

export default SpaceShips;