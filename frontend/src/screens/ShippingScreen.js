import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form} from 'react-bootstrap'
import FormeContainer from '../components/FormeContainer'
import Loading from '../components/Loading'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartAction.js'

const ShippingScreen = () => {
const navigate = useNavigate ();
const dispatch=useDispatch()
const{shippingAddress}=useSelector(state=>state.cart)
const[address,setAddress]=useState(shippingAddress.address)
const[city,setCity]=useState(shippingAddress.city)
const[postalCode,setCodePostal]=useState(shippingAddress.postalCode)
const[country,setCountry]=useState(shippingAddress.country)
const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigate('/payment')
}
  return (
    <FormeContainer>
    <CheckoutSteps step1 step2/>
    <h1>Shipping</h1>
   
    {/* {error && <Message variant={'danger'}>{error}</Message>}
    {loading &&<Loading/>} */}
    <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicAdress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter CityAddress" value={city} onChange={(e)=>{setCity(e.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCodePostal">
            <Form.Label>Code Postal</Form.Label>
            <Form.Control type="text" placeholder="Enter Code Postal" value={postalCode} onChange={(e)=>{setCodePostal(e.target.value)}}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Enter Country" value={country} onChange={(e)=>{setCountry(e.target.value)}}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Continue
        </Button>
    </Form>
</FormeContainer>
  )
}

export default ShippingScreen