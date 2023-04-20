import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';


function AstronautCard({astro, removeAstro, setData, list}) {
    const [showEdit, setShowEdit] = useState(false);



    let {id, name, age, weight} = astro
    let intlocation = parseInt(id)

    let handleSubmit = (e) => {
        e.preventDefault();
        //check what was actually changed and if no change set to existing value
        if (e.target.name.value !== '') {
            name = e.target.name.value;
        }
        if (e.target.age.value !== '') {
            age = e.target.age.value;
        }
        if (e.target.weight.value !== '') {
            weight = e.target.weight.value;
        }
        //console.log(e.target.name.value)

        fetch(`/astronauts/${intlocation}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'name' : name,
                'age' : age,
                'weight' : weight
            })
          })
            .then(r => {
                console.log(r.status);
                return r.json();
            })
            .then( res => {
                    //create copy of the list, get index of astro by id-1, 
                    //change attributes of astro,
                    // use setData to change state and update list
                    let cpy = [...list]
                    let astroId = res.id-1;
                    cpy[astroId].name = name;
                    cpy[astroId].age = age;
                    cpy[astroId].weight = weight;
                    setData(cpy)
            })
        

    }

    let dropAstro = () => {
        console.log("clicked remove!")
        console.log(`/astronauts/${intlocation}`)

        fetch(`/astronauts/${intlocation}`, {
            method: 'DELETE',
          })

        removeAstro(id)
    }

    let switchDisplay = () => {
        setShowEdit(!showEdit);
    }

    return(
        <div class="mt-4">

            <div className='card' >
            <div class='card-body'>
                <h1 class='card-title'>{name}</h1>
                <h4>Age: {age}</h4>
                <h4>Weight: {weight}lbs.</h4>
                <Button onClick={dropAstro}>Remove</Button>
                <Button onClick={switchDisplay}>Modify</Button>
            </div>
            </div>
            <div class='form-group' >
                <form hidden={!showEdit} onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input class="form-control" name='name' id="astroname" placeholder="ex. Willy Wonka" />
                    <label>Age</label>
                    <input class="form-control" name= 'age' id="astroage" placeholder="ex. 30" />
                    <label >Weight</label>
                    <input class="form-control" name='weight' id="astroweight" placeholder="LBS" />
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        
    )
}

export default AstronautCard

{/* <form onSubmit={handleSubmit}>
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
</form> */}