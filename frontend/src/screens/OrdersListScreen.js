import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Button,Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {getOrders} from '../actions/orderActions'

const OrdersListScreen = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const{userInfo}=useSelector(state=>state.userLogin)
    const{loading,orders,error}=useSelector(state=>state.ordersList)
    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){dispatch(getOrders())}
        else{navigate('/')}},[dispatch,navigate,userInfo])

  return (
    <>

                <h2>Orders</h2>
                {loading ? <Loading />:error ? <Message variant='danger'>{error}</Message>:(
                    <Table  responsive striped bordered hover className='table-sm' >
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>

                            </tr>  
                            </thead>
                            <tbody>
                            {orders.map((item,index)=>(
                            <tr key={index}>
                                <td>{item._id}</td>
                                <td>{item.user && item.user.name}</td>
                                <td>{item.createdAt.substring(0,10)}</td>
                                <td>${item.totalPrice}</td>
                                <td>{item.isPaid ? (
                                    item.paidAt.substring(0,10)):(<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                <td>{item.isDelivred ? (
                                    item.deliveredAt.substring(0,10)):(<i className='fas fa-times' style={{color:'red'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/order/${item._id}`}>
                                        <Button variant='light' className='btn btn-md' >
                                            Details
                                        </Button>
                                    </LinkContainer>
                                    
                                </td>

                            </tr>
                            ))}
                            </tbody>
                    </Table>
                )
                }
         

    </>
  )
}

export default OrdersListScreen