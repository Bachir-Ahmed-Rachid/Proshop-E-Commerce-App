import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form} from 'react-bootstrap'
import FormeContainer from '../components/FormeContainer'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {getUserProfil,userUpdate} from '../actions/userActions'
import{USER_UPDATE_RESET} from '../constants/userConstants'

const UserEditScreen = () => {
    const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[isAdmin,setIsAdmin]=useState('')
    const{id}=useParams()
    const navigate = useNavigate ();
    const dispatch=useDispatch()
    const{loading,user,error}=useSelector(state=>state.userDetails)
    const{loading:loadingUpdate,success:successUpdate,error:errorUpdate}=useSelector(state=>state.updateUser)

    useEffect(()=>{
        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            navigate('/admin/userlist')
        }else{
            if(!user.name || user._id!==id){
                dispatch(getUserProfil(id))}else{
                    setIsAdmin(user.isAdmin)
                    setName(user.name)
                    setEmail(user.email)
                }
        }
       

    },[id,dispatch,user,successUpdate,navigate])
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(userUpdate({_id:id,name,email,isAdmin}))
       
    }
  return (
    <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormeContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loading/>}
        {errorUpdate && <Message variante='danger'>{errorUpdate}</Message>}
        {loading?<Loading/>:error?<Message variant='danger'>{error}</Message>:(
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicIsAdmin">
                <Form.Check label="is Admin" type="checkbox" checked={isAdmin} onChange={(e)=>{setIsAdmin(e.target.checked)}}/>
            </Form.Group>


            <Button variant="primary" type="submit">
                Update
            </Button>
        </Form>
        )}
        
    </FormeContainer>
    </>
    
  )
}

export default UserEditScreen