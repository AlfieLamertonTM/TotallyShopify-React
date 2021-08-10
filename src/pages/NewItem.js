import React, {useState} from 'react'
import axios from 'axios'

import Footer from '../footer'

function NewItem(props) {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [image, setImage] = useState('')
    const [id, setId] = useState(props.products.length)

    const handleChange = (e, field) => {
        console.log(e.target.value)
        if (field === 'name') {
            setName(e.target.value)
        }
        if (field === 'quantity') {
            setQuantity(e.target.value)
        }
        if (field === 'image') {
            setImage(e.target.value)
        }
    }

    const handleSubmit = () => {
        axios.post('https://6uh0la089e.execute-api.eu-west-1.amazonaws.com/dev/products', {
            name: name,
            productID: id.toString(),
            quantity: quantity,
            imageURL: image
        })
        .then(function (response) {
            console.log(response)
            setId(id + 1)
        })
        .catch(function (error) {
            console.log(error)
        })
        .then(function () {
            setName('')
            setQuantity(0)
            setImage('')
        })
    }

    return (
        <div className="App">
            <div className="About">
                <h1>
                    Create a new Product
                </h1>
            </div>
            <main className="main">
                <div className="form">     
                    <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => handleChange(e, 'name')} />
                    </label>
                    <label>
                        Quantity:
                        <input type="number" value={quantity} onChange={(e) => handleChange(e, 'quantity')} />
                    </label>
                    <label>
                        Image:
                        <input type="text" value={image} onChange={(e) => handleChange(e, 'image')} />
                    </label>
                    <button onClick={handleSubmit}>Submit</button>
                </div>   
            </main>
            <Footer/>
        </div>
    )
}

export default NewItem