import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'
import Footer from './footer'

function App() {
  const [postData, setPostData] = useState("TotallyShopify")
  const [showSilly, setShowSilly] = useState("none")
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('https://6uh0la089e.execute-api.eu-west-1.amazonaws.com/dev/products')
    .then(function (response) {
      console.log(response)
      setProducts(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
    .then(function () {
      
    })
  }, [])

  const makePostRequest = (prod) => {
      axios.post('https://6uh0la089e.execute-api.eu-west-1.amazonaws.com/dev/order/create', {
        productID: prod.productID
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error)
      })
      .then(function () {
        setPostData("Ordered")
        // setShowSilly("block")
      })
  }

  return (
    <div className="App">
      <div className="Header">
        <h1>{postData}</h1>
      </div>
      <div className="About">
        <h1>The purpose of this site is to give an interface to the my front end serverless project.
          There are two pages;
          the products page has a dynamic list of items that a customer can order; 
          the admin page allows a user to confirm 
          placed orders, and update the products database. Enjoy.
        </h1>
      </div>
      <main className="main">
        {products.map((product, i) =>
          <div className="product-listing" key={i}>
            <h3>{product.name}</h3>
            <img className="product-image" src={product.imageURL} width="300px" vertical-align="middle" alt={product.name} />
            <div>
              {product.quantity >= 1 ? 
                <button className="button" onClick={() => makePostRequest(product)}>Order</button> : 
                "Out of stock"                
              }
            </div>
          </div>
        )}
        <img style={{display: showSilly}} className="silly" src={process.env.PUBLIC_URL + '/alfie-charlie.jpg'} alt="silly" />
      </main>
      <Footer/>
    </div>
  )
}

export default App