import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import {listProdcuts} from '../actions/productActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from './ProductCarousel'
import Meta from '../components/Meta'

const HomeScreen = () => {
  const{keyword,pageNumber}=useParams()
  const dispatch=useDispatch()
  const{loading,products,error,pages,page}=useSelector(state=>state.productList)
  useEffect(()=>{dispatch(listProdcuts(keyword,pageNumber))},[dispatch,keyword,pageNumber])         //lifeCyclMethode
  return (
    <>
    <Meta/>
    {!keyword ? <ProductCarousel/>: <Link className='btn btn-light' to='/'>Go Back</Link>}
    <h1>Lates Products</h1>
    {loading?<Loading/>:error?<Message variant='danger'>{error}</Message>: 
    <>
    <Row>
        {products.map(product =>
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
            </Col>
                )}
            
    </Row>
    <Paginate
    page={page}
    pages={pages}
    keyword={keyword?keyword:''}></Paginate>
    </>}
   
        
    </>
  )
}

export default HomeScreen