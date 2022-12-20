import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {addToCart,removeFromCart} from '../actions/cartAction'
const CartScreen = () => {
  const dispatch=useDispatch()
  const{id}=useParams()
  const{search}=useLocation() 
  const qty= search?Number(search.split("=")[1]):1
  const{cartItems}=useSelector(state=>state.cart)
  const navigate = useNavigate ();
  const removeItemHandler=(itemId)=>{
    dispatch(removeFromCart(itemId))
  }
  const checkoutHnadler=()=>{
    navigate('/login?redirect=/shipping')
  }
  useEffect(()=>{
    if(id){dispatch(addToCart(id,qty))}
  },[dispatch,id,qty])
  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Cart List</h1>
          {cartItems.length===0 ? (<Message>You cart is empty <Link to={'/'}>Go back</Link></Message>):
          (
            <ListGroup variant='flush'>
            {cartItems.map(item =>(
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                  </Col>
                  <Col md={3}>
                    <Link to={`/products/${item.product}`}>{item.name}</Link>                  
                  </Col>
                  <Col md={2}>${item.price}
                  </Col>
                  <Col md={2}>
                  <Form.Select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                      {[...Array(item.countInStock).keys()].map(elemnt=>(
                       <option key={elemnt+1} value={elemnt+1}>{elemnt+1}</option>
                      ))}
                      </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={()=>removeItemHandler(item.product)}><i className='fas fa-trash'></i></Button>
                  </Col>
                </Row>
                </ListGroupItem>
          ))}
          </ListGroup>)}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>SubTotal({cartItems.reduce((acc,item)=>acc+item.qty,0)})Item</h2>
                ${cartItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
                  <Button type='button' className='btn btn-block' disabled={cartItems.length===0} 
                  onClick={checkoutHnadler}>Proceed to Checkout </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>

      </Row>
    </>
  )
}

export default CartScreen