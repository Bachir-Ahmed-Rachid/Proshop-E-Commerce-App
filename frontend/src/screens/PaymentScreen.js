import React ,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Col,Button,Form} from 'react-bootstrap'
import FormeContainer from '../components/FormeContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartAction.js'

const PaymentScreen = () => {
const navigate = useNavigate ();
const dispatch=useDispatch()
const{shippingAddress}=useSelector(state=>state.cart)
if(!shippingAddress){navigate('/shipping')}
const[paymentMethod,setPaymentMethod]=useState('PayPal')
const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
}
  return (
    <FormeContainer>
    <CheckoutSteps step1 step2 step3/>
    <h1>Payment Method</h1>
    <Form onSubmit={submitHandler}>
        <Form.Group>
        <Form.Label as='legend'>
                Select Method
        </Form.Label>
        <Col>
        <Form.Check 
            type='radio'
            id='PayPal'
            label='PayPal or CreditCard'
            name='PaymentMethode'
            value='PayPal'
            onChange={(e)=>{setPaymentMethod(e.target.value)}}
          />
            <Form.Check 
            type='radio'
            id='Stripe'
            label='Strip'
            name='PaymentMethode'
            value='Strip'
            onChange={(e)=>{setPaymentMethod(e.target.value)}}
          />
          </Col>
       
        </Form.Group>
        

        <Button variant="primary" type="submit">
            Continue
        </Button>
    </Form>
</FormeContainer>
  )
}

export default PaymentScreen
