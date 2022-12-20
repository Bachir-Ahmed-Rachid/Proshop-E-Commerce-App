import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form} from 'react-bootstrap'
import FormeContainer from '../components/FormeContainer'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {register} from '../actions/userActions'

const RegisterScreen = () => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const[confirmPassword,setConfirmPassword]=useState('')
    const[message,setMessage]=useState(null)
    const{search}=useLocation() 
    const navigate = useNavigate ();
    const dispatch=useDispatch()
    const{loading,userInfo,error}=useSelector(state=>state.userRegister)
    const redirect=search?search.split("=")[1]:'/'
    useEffect(()=>{
        if(userInfo){navigate(redirect)}},[redirect,userInfo,search])
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage('Password dont match')
        }else{
            dispatch(register(name,email,password))
        }
    }
  return (
    <FormeContainer>
        <h1>Sign In</h1>
        {message && <Message variant={'danger'}>{message}</Message>}
        {error && <Message variant={'danger'}>{error}</Message>}
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
                Register
            </Button>
        </Form>
        <Row className='py-3'>
            <Col>
                Have an account?{' '}<Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Login</Link>
            </Col>
        </Row>
    </FormeContainer>
  )
}

export default RegisterScreen