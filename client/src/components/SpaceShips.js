import React, {useEffect, useState} from 'react';
import SpaceShipCard from './SpaceShipCard.js';
import Button from 'react-bootstrap/Button';

function SpaceShips() {

    const [data, setData] = useState([])
    const [visibility, setVisibility]=useState(true)
    const [formData, setFormData] = useState({
        name: '',
        image: ''
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
                'name': formData.name,
                'image': formData.image
            })
        })
        .then(res => res.json())
        .then(res => {
            setData([...data, res])
        })
        e.target.reset()
        setVisibility(!visibility)
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]:value})
        console.log(formData)
    }
    
    useEffect(() => {

        fetch('/spaceships')
            .then(res=> res.json())
            .then(data => {
                setData(data)
            })
    }, [])
    
    const spacelist = data.map((spaceship) => {
        return ( <SpaceShipCard key={spaceship.id} spaceship={spaceship}/> )
    })
    
    const handleVisibility = () => {
        setVisibility(!visibility)
    }
    
    return(
        <div>
            <div>
                <Button onClick={handleVisibility}>Add New Ship</Button>
                <form hidden={visibility} onSubmit={handleSubmit} style={{ width: '51%', margin:'auto'}}>
                    <div class='form-group'>
                        <label> SpaceShip Name </label>
                        <input onChange={handleChange} class= 'form-control' name='name' id='spaceshipname' placeholder="ex. Rainbow9"/> 
                    </div>
                    <div class="form-group">
                        <label >SpaceShip Image</label>
                        <input onChange={handleChange} name='image' class="form-control" id="spaceshipname" placeholder="URL" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div class='row row-cols-3 me-2' > 
                {spacelist}
            </div>
        </div>
 
    )
}

export default SpaceShips;