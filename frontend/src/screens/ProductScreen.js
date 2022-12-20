import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate } from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {detailProdcuts,producReview} from '../actions/productActions'
import { PRODUCT_CREAT_REVIEW_RESETE} from '../constants/productConstants.js' 
import Meta from '../components/Meta'
const ProductScreen = () => {
  const{id}=useParams()
  const navigate = useNavigate ();
  const dispatch=useDispatch()
  const{userInfo}=useSelector(state=>state.userLogin)
  const{loading,product,error}=useSelector(state=>state.productDetail)
  const{loading:reviewLoading,error:reviewError,success:reviewSuccess}=useSelector(state=>state.productAddReview)
  const[qty,setQty]=useState(1)
  const[rating,setRating]=useState(0)
  const[comment,setComment]=useState('')
  useEffect(()=>{
    dispatch({type:PRODUCT_CREAT_REVIEW_RESETE})
    if(reviewSuccess){
      alert('Review added')
      setRating(0)
      setComment('')
      
    }
    dispatch(detailProdcuts(id))}
    ,[dispatch,id,reviewSuccess])
  
  const addToCartHandler=()=>{
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(producReview(id,{rating,comment}))
  }
  return (
    <>
    <div>
      <div>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      </div>
     
      {loading? <Loading/>:error?<Message variant={'danger'}>{error}</Message>:
        <>
        <Meta title={product.name}/>
          <Row>
            <Col md={6}>
              <Image alt={product.name} src={product.image} fluid/>
            </Col>
            <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating text={`${product.numReviews} reviews`} value={product.rating}/>
                </ListGroupItem>
                <ListGroupItem>
                    Price:${product.price}
                </ListGroupItem>
                <ListGroupItem>
                    Description:{product.description}
                </ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroupItem>
                    <Row>
                      <Col>Price</Col>
                      <Col><strong>{product.price}</strong></Col>
                    </Row>
                  </ListGroupItem>
                  
                  <ListGroupItem>
                    <Row>
                      <Col>Status</Col>
                      <Col>{product.countInStock>0?'In Stock':'Out Of Stock'}</Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Select value={qty} onChange={(e)=>setQty(e.target.value)}>
                              <option key={1} value={1}>{1}</option>
                              {[...Array(product.countInStock).keys()].map(elemnt=>(
                              <option key={elemnt+2} value={elemnt+2}>{elemnt+2}</option>
                              ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock===0} type='button'>Add to Cart</Button>
                  </ListGroupItem>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h1>Reviews</h1>
              {product.reviews.length===0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
                                {product.reviews.map((review)=>(
                                  <ListGroupItem key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating}/>
                                    <p>{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                  </ListGroupItem>
                                ))}
                          <ListGroupItem>
                            <h2>Write a customer review</h2>
                            {reviewLoading && <Loading/>}
                            {reviewError && <Message variant={'danger'}>{reviewError}</Message>}
                            {userInfo?(
                               <Form onSubmit={submitHandler}>
                               <Form.Group className='mb-3' controlId='rating'>
                                 <Form.Label>
                                   Rating
                                 </Form.Label>
                                 <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                                   <option value=''>Select...</option>
                                   <option value='1'>1-Poor</option>
                                   <option value='2'>2-fair</option>
                                   <option value='3'>3-Good</option>
                                   <option value='4'>4-Very Good</option>
                                   <option value='5'>5-Excellent</option>
                                 </Form.Control>
 
                               </Form.Group>

                               <Form.Group className='mb-3' controlId='comment'>
                                 <Form.Control
                                 as='textarea'
                                 row='3'
                                 value={comment}
                                 onChange={e=>setComment(e.target.value)}>

                                 </Form.Control>

                               </Form.Group>
                               <Button type='submit' variant='primary'>Add Review</Button>
                             </Form>
                            ):(
                              <Message>Please <Link to='/login'> sign in </Link>to write review{' '}</Message>
                            )}
                           
                          </ListGroupItem>
                          
            </ListGroup>
        </Col>
          </Row>
          </>
        }
      
    </div>
    </>
  )
  
}

export default ProductScreen