import React, {useEffect, useState} from "react"
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import './App.css'
import NewItem from './pages/NewItem'
import Products from './pages/Products'

export default function BasicExample() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getproducts()
  }, [])

  const getproducts = () => {
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
  }

  return (
    <Router>
      <div>
        <div className="navbar">
            <Link to="/">Products</Link>
            <Link to="/new">Create New</Link>
        </div>

        <Switch>
          <Route exact path="/">
            <Products products={products} />
          </Route>
          <Route path="/new">
            <NewItem products={products} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}