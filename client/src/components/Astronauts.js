import React, { useEffect, useState } from "react";
import AstronautCard from './AstronautCard.js'
import Button from 'react-bootstrap/Button';


function Astronauts() {
    const [data, setData] = useState([])
    const [showForm, setShowForm]=useState(true)
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

        e.target.reset()
        setShowForm(!showForm)
    }

    let removeAstro = (drop) => {
        setData(data.filter((astro) => astro.id != drop))
    }

    let displayForm = () => {
        setShowForm(!showForm)
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
        return < AstronautCard astro = {astro} removeAstro={removeAstro} setData={setData} list={data}/>
    }) 

    return(
        <div class="mt-2 px-10">
            <div class="container text-center" style={{margin:'auto'}} >
                <Button variant ="dark" class='mx-auto' onClick={displayForm}>Add New Astronaut</Button>
                <form hidden={showForm} onSubmit={handleSubmit}>
                    <div class="pb-2 py-4 form-group">
                        <label >Astronaut Name</label>
                        <input class="form-control" name='name' id="astroname" aria-describedby="emailHelp" placeholder="ex. Willy Wonka" onChange={handleChange} />
                    </div>
                    <div class="pb-2 form-group">
                        <label >Astronaut Age</label>
                        <input onChange={handleChange} name= 'age' class="form-control" id="exampleInputPassword1" placeholder="ex. 30" />
                    </div>
                    <div class="pb-4 form-group">
                        <label >Astronaut Weight</label>
                        <input onChange={handleChange} class="form-control" name='weight' id="exampleInputPassword1" placeholder="ex. 155" />
                    </div>
                    <Button variant = "dark" type="submit" class="btn btn-primary">Submit</Button>
                </form>
            </div>
            <div class='row row-cols-3 px-3 pe-2 ps-3'>
                {astrolist}
            </div>
        </div>
    )
    }
        


export default Astronauts