import axios from 'axios'
import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form} from 'react-bootstrap'
import {PayPalButton} from 'react-paypal-button-v2'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {orderDetails,orderUpdate,orderDilevered} from '../actions/orderActions.js'
import {ORDER_UPDATE_RESET,ORDER_DILEVER_RESET} from '../constants/orderConstants.js' 

const OrderDetailsScreen = () => {
    const dispatch=useDispatch()
    const[sdkReady,setSdkReady]=useState(false)
    const navigate = useNavigate ();
    const{id}=useParams()
    const{userInfo}=useSelector(state=>state.userLogin)
    const{loading:loadingPay,success:successPay}=useSelector(state=>state.orderUpdate)
    const{loading:loadingDilver,success:successDilver,error:errorDilever}=useSelector(state=>state.orderDilever)
    const{error,loading,order}=useSelector(state=>state.OrderDetails)

    const addDecimals=(num)=>{
        return (Math.round(num*100)/100).toFixed(2)
    }
    
    useEffect(()=>{
        if(!userInfo){navigate('/login')}

            const addPayPalScript=async () =>{
                const {data:clientId}=await axios.get('/api/config/paypal')
                const script=document.createElement('script')
                script.type='text/javascript'
                script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
                script.async=true
                script.onload=()=>{
                    setSdkReady(true)
                }
                document.body.appendChild(script) }
            
            if(!order || successPay || successDilver){
                dispatch({type:ORDER_UPDATE_RESET})
                dispatch({type:ORDER_DILEVER_RESET})
                dispatch(orderDetails(id))
            }else if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript()
                }else{
                    setSdkReady(true)
                }
            }
        
        
        },[dispatch,id,successPay,order,successDilver])

    const successPaymentHandler=(paymentResult)=>{
           dispatch(orderUpdate(id,paymentResult))
        }
    const dilverHandler=()=>{
            dispatch(orderDilevered(order._id))
         }

        if(order){   
        order.itemsPrice=addDecimals(order.orderItems.reduce((acc,item)=>
        acc+item.price*item.qty,0))}
  return (
    loading?<Loading/>:error ?<Message variant='danger'>{error}</Message>:
    <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                
                    <ListGroupItem>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name:{order.user.name}</strong>
                        </p>
                        <p>
                            <strong>Email:<a href={`mailto${order.user.email}`}>{order.user.email}</a></strong>
                        </p>
                            <strong>Address:</strong>
                            <p>
                                {order.shippingAddress.address}{' '},{order.shippingAddress.city},{' '}{order.shippingAddress.codePostal},{' '}
                                {order.shippingAddress.country},
                            </p>
                            {order.isDelivered?<Message variant='success'>Delivered on {order.deliveredAt}</Message>:<Message variant='danger'>Not Delivered</Message>}

                    </ListGroupItem>
                       
                    <ListGroupItem>
                        <h2>Payment Methode</h2>
                        <p>
                        <strong>Method:{order.paymentMethode}</strong>
                        </p>
                        {order.isPaid?<Message variant='success'>Paid on {order.paidAt}</Message>:<Message variant='danger'>Not Paid</Message>}
                    </ListGroupItem>

                    
                    <ListGroupItem>
                        <h2>Order items</h2>
                        {order.orderItems.length===0?(<Message>Your Cart is empty</Message>):(
                            <ListGroup variant='flush'>
                                    {order.orderItems.map((item,index)=>(
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
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem>
                        {error && <Message variant={'danger'}>{error}</Message>}
                        </ListGroupItem>
                        {!order.isPaid && (
                            <ListGroupItem>
                                {loadingPay && <Loading/>}
                                {!sdkReady? <Loading/>:
                                <PayPalButton 
                                 amount={order.totalPrice}
                                 onSuccess={successPaymentHandler}
                                />}
                            </ListGroupItem>
                        )}
                        {loadingDilver && <Loading />}
                         {errorDilever && <Message variant='danger'>{errorDilever}</Message>}
                         {userInfo && userInfo.isAdmin  && !order.isDelivered &&  order.isPaid && (
                             <ListGroupItem>
                             <Button type='button' className='btn btn-md' onClick={dilverHandler}>
                                 Mark as dilevred
                             </Button>
                             </ListGroupItem>
                         )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default OrderDetailsScreen