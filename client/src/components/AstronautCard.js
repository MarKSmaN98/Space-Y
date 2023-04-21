import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';


function AstronautCard({astro, removeAstro, setData, list}) {
    const [showEdit, setShowEdit] = useState(true);



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
                    setShowEdit(!showEdit)
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

    let mainDisp = () => {
        return (
            <div className="card-body">
                <h1 class='card-title'>{name}</h1>
                <h4>Age: {age}</h4>
                <h4>Weight: {weight}lbs.</h4>
            </div>
        )
    }
    let modDisp = () => {
        return (
            <div class='form-group mb-2'>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input class="form-control" name='name' id="astroname" placeholder="ex. Willy Wonka" />
                    <label>Age</label>
                    <input class="form-control" name= 'age' id="astroage" placeholder="ex. 30" />
                    <label >Weight</label>
                    <input class="form-control mb-2" name='weight' id="astroweight" placeholder="LBS" />
                    <Button type="submit mt-1" variant="dark" class="btn btn-primary">Submit</Button>
                </form>
            </div>
        )
    }

    return(
        <div class="mt-4">
            <div class="card text-center bg-light">
                {
                    showEdit? mainDisp() : modDisp()
                }
                <div class="ms-2 mb-2 text-center">
                    <Button variant="danger" onClick={dropAstro}>Remove</Button>
                    <Button variant="secondary" onClick={switchDisplay}>Modify</Button>
                </div>
            </div>
        </div>
    )
}

export default AstronautCard






{/* <div class="mt-4">

<div className='card' >
<div class='card-body'>
    <h1 class='card-title'>{name}</h1>
    <h4>Age: {age}</h4>
    <h4>Weight: {weight}lbs.</h4>
    <Button variant="danger" onClick={dropAstro}>Remove</Button>
    <Button variant="secondary" onClick={switchDisplay}>Modify</Button>
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
        <Button variant="dark" type="submit" class="btn btn-primary">Submit</Button>
    </form>
</div>
</div>
 */}
