import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form,Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import FormeContainer from '../components/FormeContainer'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {getUsersList,userDelete} from '../actions/userActions'

const UsersListScreen = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const{userInfo}=useSelector(state=>state.userLogin)
    const{loading,usersList,error}=useSelector(state=>state.allUsers)
    const{success:deleteSuccess}=useSelector(state=>state.deleteUser)
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){dispatch(getUsersList())}
        else{navigate('/')}},[dispatch,navigate,deleteSuccess,userInfo])
const deletHnadler=(id)=>{
    if(window.confirm('are you sure?')){
        dispatch(userDelete(id))

    }
}

  return (
    <>

                <h2>Users</h2>
                {loading ? <Loading />:error ? <Message variant='danger'>{error}</Message>:(
                <>
                    <Table  responsive striped bordered hover className='table-sm' >
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>NAME</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {usersList.map((item,index)=>(
                            <tr key={index}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td><a href={`mailto${item.email}`}>{item.email}</a></td>
                                <td>{item.isAdmin?<i className='fas fa-check' style={{color:'green'}}></i>:<i className='fas fa-times' style={{color:'red'}}></i>}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${item._id}/edit`}>
                                        <Button variant='light' className='btn btn-md' >
                                             <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='light' className='btn btn-md' onClick={()=>deletHnadler(item._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>

                            </tr>
                            ))}
                            </tbody>
                    </Table>
                </>)
                }
         

    </>
  )
}

export default UsersListScreen