import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form} from 'react-bootstrap'
import FormeContainer from '../components/FormeContainer'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {login} from '../actions/userActions'

const LoginScreen = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const{search}=useLocation() 
    const navigate = useNavigate ();
    const dispatch=useDispatch()
    const{loading,userInfo,error}=useSelector(state=>state.userLogin)
    const redirect=search?search.split("=")[1]:'/'
    useEffect(()=>{
        if(userInfo){navigate(redirect)}},[redirect,userInfo])
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
  return (
    <FormeContainer>
        <h1>Sign In</h1>
        {error && <Message variant={'danger'}>{error}</Message>}
        {loading &&<Loading/>}
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Sign In
            </Button>
        </Form>
        <Row className='py-3'>
            <Col>
                New Customer?{' '}<Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
            </Col>
        </Row>
    </FormeContainer>
  )
}

export default LoginScreen