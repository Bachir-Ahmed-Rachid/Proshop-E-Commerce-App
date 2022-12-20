import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form,Table } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {getUserProfil,updateUserProfil} from '../actions/userActions'
import {getMyOrders} from '../actions/orderActions'

const ProfileScreen = () => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const[message,setMessage]=useState(null)
    const{search}=useLocation() 
    const navigate = useNavigate ();
    const dispatch=useDispatch()
    const{loading,user,error}=useSelector(state=>state.userDetails)
    const{loading:myOrderLoading,error:myOrdersError,myOrders}=useSelector(state=>state.myOrders)
    const{userInfo}=useSelector(state=>state.userLogin)
    const{success}=useSelector(state=>state.userUpdate)
    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        } else{
                if(!user.name){
                    dispatch(getUserProfil(userInfo._id))
                    dispatch(getMyOrders())

                }else{
                    setName(user.name)
                    setEmail(user.email)
                }
            }},[dispatch,search,userInfo,user])
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage('Password dont match')
        }else{
            dispatch(updateUserProfil({id:user._id,password,email,name}))
        }
    }
  return (
        <Row >
            <Col md={3}>
            <h1>Profile Details</h1>
        {message && <Message variant={'danger'}>{message}</Message>}
        {error && <Message variant={'danger'}>{error}</Message>}
        {success && <Message variant={'success'}>Profile Updated</Message>}
        {loading &&<Loading/>}
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasiConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
            </Form.Group>

            <Button variant="primary" type="submit">
                Update
            </Button>
        </Form>
            </Col>
            <Col md={9}>
                <h2>Orders</h2>
                {myOrderLoading && <Loading />}
                {myOrdersError?<Message variant='danger'>{myOrdersError}</Message>:
                 myOrders.length===0?(<Message>Your Order liste is empty</Message>):(
                    <div style={{overflow: 'scroll',height:'600px'}}>
                <Table  responsive striped bordered hover className='table-sm' >
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Dilevred</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {myOrders.map((item,index)=>(
                        <tr key={index}>
                            <td>{item._id}</td>
                            <td>{item.createdAt.substring(0,10)}</td>
                            <td>${item.totalPrice}</td>
                            <td>{item.isPaid?item.paidAt.substring(0,10):<i className='fas fa-times' style={{color:'red'}}></i>}</td>
                            <td>{item.isDelivered?item.dileveredAt.substring(0,10):<i className='fas fa-times' style={{color:'red'}}></i>}</td>
                            <td>
                                <LinkContainer to={`/order/${item._id}`}>
                                    <Button className='btn btn-sm' > Details</Button>
                                </LinkContainer>
                            </td>

                        </tr>
                        ))}
                        </tbody>
              </Table>
              </div>)
                }
            </Col>
        </Row>
  )
}

export default ProfileScreen