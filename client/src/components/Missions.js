import React, {useEffect, useState} from 'react';
import MissionCard from './MissionCard.js'
import Button from 'react-bootstrap/Button';

function Missions() {
    const [data, setData] = useState([])
    const [visibility, setVisibility]=useState(true)
    const [formData, setFormData] = useState({
        astronaut_id:'',
        spaceship_id:''
    })

    useEffect(() => {
        fetch('/missions')
        .then(r => r.json())
        .then(setData)
    },[])


    let handleSubmit = (e) => {
        e.preventDefault()
        fetch("/missions", {
            method:'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'astronaut_id': formData['astronaut_id'],
                'spaceship_id': formData['spaceship_id']
            })
        }) 
        .then(r => r.json())
        .then(res => {
            setData([...data, res])
        })
        e.target.reset()
        setVisibility(!visibility)
    }

    const handleVisibility = () => {
        setVisibility(!visibility)
    }

    let handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]:value})
        console.log(formData)
    }

    let missionList = data.map((mission) => {
        return <MissionCard mission={mission}/>
    })
    
    console.log(missionList)


    return(
        <div class="text-center">
            <Button onClick={handleVisibility}>Add New Mission Assignment</Button>
            <form hidden={visibility} onSubmit={handleSubmit} style={{ width: '51%', margin:'auto'}}>
                <h2>Add New Mission Assignment: </h2>
                <div class='form-group'>
                    <label> SpaceShip Id </label>
                    <input onChange={handleChange} class= 'form-control' name='spaceship_id' placeholder="ex. Rainbow9"/> 
                </div>
                <div class="form-group">
                    <label >Astronaut Id</label>
                    <input onChange={handleChange} name='astronaut_id' class="form-control" placeholder="URL" />
                </div>
                <button onClick ={handleSubmit} type="submit" class="btn btn-primary">Submit</button>
            </form>
            <div class='row row-cols-3 me-2'>
                {missionList}
            </div>
            
        </div>
        
    )
}

export default Missions