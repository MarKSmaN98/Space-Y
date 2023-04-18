import React, { useEffect, useState } from "react";
import AstronautCard from './AstronautCard.js'

function Astronauts() {
    const [data, setData] = useState([])

    useEffect(() => { 
    fetch("/astronauts")
        .then(res=> res.json())
        .then(data => {
         setData(data)
         console.log(data)
        })
        }, [])

    let astrolist = data.map((astro) => {
        return < AstronautCard astro = {astro}/>
    }) 

    return(
        <div>
            <div>
                <form>
                    <div class="form-group">
                        <label >Astronaut Name</label>
                        <input class="form-control" id="astroname" aria-describedby="emailHelp" placeholder="ex. Willy Wonka" />
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label >Astronaut Age</label>
                        <input class="form-control" id="exampleInputPassword1" placeholder="ex. 30" />
                    </div>
                    <div class="form-group">
                        <label >Astronaut Weight</label>
                        <input class="form-control" id="exampleInputPassword1" placeholder="ex. 155" />
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