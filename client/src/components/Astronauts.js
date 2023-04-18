import React, { useEffect, useState } from "react";
import AstronautCard from './AstronautCard.js'


function Astronauts() {
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({
        name:'',
        age:'',
        weight:''
    })

    let handleSubmit = (e) => {
        e.preventDefault()
        fetch("/astronauts", {
            method:'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': formData.name,
                'age': formData.age,
                'weight': formData.weight
            })
        }) 
        .then(r => r.json())
        .then(res => {
            setData([...data, res])
        })
    }

    let removeAstro = (drop) => {
        setData(data.filter((astro) => astro.id != drop))
    }


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

    let astrolist = data.map((astro) => {
        return < AstronautCard astro = {astro} removeAstro={removeAstro}/>
    }) 

    return(
        <div>
            <div>
                <form onSubmit={handleSubmit}>
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