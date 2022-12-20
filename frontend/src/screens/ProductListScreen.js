import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form,Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import FormeContainer from '../components/FormeContainer'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import {listProdcuts,productDelete,productCreate} from '../actions/productActions'
import{PRODUCT_CREATE_RESETE} from '../constants/productConstants'

const ProductListScreen = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const{pageNumber}=useParams()
    const{userInfo}=useSelector(state=>state.userLogin)
    const{loading,products,error,pages,page}=useSelector(state=>state.productList)
    const{loading:deleteLoading,success:successLoading,error:errorLoading}=useSelector(state=>state.productDelete)
    const{
        loading:createLoading,
        success:createsuccess,
        error:createerror,
        product:createdProduct
    }=useSelector(state=>state.productCreate)

    useEffect(()=>{
        dispatch({
            type:PRODUCT_CREATE_RESETE,
        })
        if(!userInfo.isAdmin)
        {navigate('/login')}

        if(createsuccess){
            navigate(`/admin/userProduct/${createdProduct._id}/edit`)
        }else{ dispatch(listProdcuts('',pageNumber))}},
        [dispatch,navigate,listProdcuts,userInfo,successLoading,createsuccess,createdProduct,pageNumber])
const creatProductHandler=()=>{
    dispatch(productCreate())
}

const deleteHandler=(id)=>{
    if(window.confirm('are you sure?')){
        dispatch(productDelete(id))

    }
}

  return (
    <>
    <Row className='align-items-center'>
        <Col >
            <h1>Products</h1>
        </Col>
        <Col className='d-flex justify-content-end'>
            <Button className='my-3' onClick={()=>creatProductHandler()}><i className='fas fa-plus'></i>Add product</Button>
        </Col>
    </Row>
   {deleteLoading && <Loading />}
   {errorLoading && <Message variant='danger'>{errorLoading}</Message>}
   {createLoading && <Loading />}
   {createerror && <Message variant='danger'>{createerror}</Message>}
            {loading ? <Loading />:error ? <Message variant='danger'>{error}</Message>:(
                <>
                    <Table  responsive striped bordered hover className='table-sm' >
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>Category</th>
                                <th>BRAND</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((item,index)=>(
                            <tr key={index}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.category}</td>
                                <td>{item.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/userProduct/${item._id}/edit`}>
                                        <Button variant='light' className='btn btn-md' >
                                             <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='light' className='btn btn-md' onClick={()=>deleteHandler(item._id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>

                            </tr>
                            ))}
                            </tbody>
                    </Table>
                    <Paginate
                        page={page}
                        pages={pages}
                        isAdmin={true}>
                    </Paginate>
                </>)
                }
         
       
   
               
                
    </>
  )
}

export default ProductListScreen