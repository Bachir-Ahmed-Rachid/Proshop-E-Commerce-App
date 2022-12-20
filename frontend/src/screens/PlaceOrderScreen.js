import React ,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form} from 'react-bootstrap'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../actions/orderActions.js'

const PlaceOrderScreen = () => {
    const dispatch=useDispatch()
    const navigate = useNavigate ();
    const{shippingAddress,paymentMethode,cartItems}=useSelector(state=>state.cart)
    const{error,success,order}=useSelector(state=>state.orderCreat)
    const cart =useSelector(state=>state.cart)
    const addDecimals=(num)=>{
        return (Math.round(num*100)/100).toFixed(2)
    }
    cart.itemsPrice=addDecimals(cartItems.reduce((acc,item)=>
    acc+item.price*item.qty,0))
    cart.shippingPrice=addDecimals(cart.itemsPrice<100?100:0)
    cart.taxPrice=addDecimals(Number(0.15*cart.itemsPrice).toFixed(2))
    cart.totalPrice=addDecimals(
        Number(cart.itemsPrice)+
        Number(cart.shippingPrice)+
        Number(cart.taxPrice))
const placeorderHandler=()=>{
    dispatch(createOrder({
            shippingAddress:shippingAddress,
            paymentMethode:paymentMethode,
            orderItems:cartItems,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice
        }))
       
    }
    useEffect(()=>{
        if(success){
        navigate(`/order/${order._id}`)}
    },[success,navigate])
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>

                    <ListGroupItem>
                        <h2>Shipping</h2>
                            <strong>Address:</strong>
                            <p>
                                {shippingAddress.address}{' '},{shippingAddress.city},{' '}{shippingAddress.codePostal},{' '}
                                {shippingAddress.country},
                            </p>
                    </ListGroupItem>
                       
                    <ListGroupItem>
                        <h2>Payment Methode</h2>
                        <strong>Method:{paymentMethode}</strong>
                    </ListGroupItem>

                    
                    <ListGroupItem>
                        <h2>Order items</h2>
                        {cartItems.length===0?(<Message>Your Cart is empty</Message>):(
                            <ListGroup variant='flush'>
                                    {cartItems.map((item,index)=>(
                                         <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty}*${item.price}=${item.qty*item.price}
                                                </Col>
                                            </Row>
                                         </ListGroupItem>
                                    ))}
                                   
                            </ListGroup>
                            )}
                    </ListGroupItem>


                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Order Summury </h2>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                        {error && <Message variant={'danger'}>{error}</Message>}
                        </ListGroupItem>
                        <ListGroupItem>
                        <Button className='btn-block' type='button' disabled={cartItems.length===0} onClick={placeorderHandler}>Place Order</Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen