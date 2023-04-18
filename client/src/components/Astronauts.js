import React, { useEffect, useState } from "react";
import AstronautCard from './AstronautCard.js'


function Astronauts() {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({
        name:'',
        age:'',
        weight:''
    })

    let handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]:value})
        console.log(formData)
    }

    useEffect(() => { 
    fetch("/astronauts")
        .then(res=> res.json())
        .then(data => {
         setData(data)
        })
        }, [])

    console.log(formData)

    let astrolist = data.map((astro) => {
        return < AstronautCard astro = {astro}/>
    }) 

    return(
        <div>
            <div>
                <form>
                    <div class="form-group">
                        <label >Astronaut Name</label>
                        <input class="form-control" name='name' id="astroname" aria-describedby="emailHelp" placeholder="ex. Willy Wonka" onChange={handleChange} />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label >Astronaut Age</label>
                        <input onChange={handleChange} name= 'age' class="form-control" id="exampleInputPassword1" placeholder="ex. 30" />
                    </div>
                    <div class="form-group">
                        <label >Astronaut Weight</label>
                        <input onChange={handleChange} class="form-control" name='weight' id="exampleInputPassword1" placeholder="ex. 155" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div>
                {astrolist}
            </div>
        </div>
    )
    }
        


export default Astronauts