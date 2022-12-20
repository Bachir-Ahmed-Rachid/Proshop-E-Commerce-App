import axios from 'axios'
import React ,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link,useParams,useNavigate,useLocation } from 'react-router-dom'
import {Row,Col,Card,ListGroup,Button,Image,ListGroupItem,Form} from 'react-bootstrap'
import FormeContainer from '../components/FormeContainer'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {detailProdcuts,productUpdate} from '../actions/productActions'
import{PRODUCT_UPDATE_RESETE} from '../constants/productConstants'



const ProductEditScreen = () => {
    const[name,setName]=useState('')
    const[price,setPrice]=useState(0)
    const[brand,setBrand]=useState('')
    const[category,setCategory]=useState('')
    const[image,setImage]=useState('')
    const[countInStock,setCountInStock]=useState(0)
    const[description,setDescription]=useState('')
    const[numReviews,setNumReviews]=useState(0)
    const[uploading,setUploading]=useState(false)

    const{id}=useParams()
    const navigate = useNavigate ();
    const dispatch=useDispatch()
    const{loading,product,error}=useSelector(state=>state.productDetail)
    const{loading:updateLoading,error:updateError,success:updateSuccess}=useSelector(state=>state.updateProduct)


    useEffect(()=>{
        if(updateSuccess){
            dispatch({type:PRODUCT_UPDATE_RESETE})
            navigate('/admin/userProduct')
        }else{
            if(!product.name || product._id!==id){
                dispatch(detailProdcuts(id))}else{
                    setName(product.name)
                    setPrice(product.price)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setImage(product.image)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
                    setInterval(product.numReviews)

                }
        }
            
        
       

    },[id,dispatch,product,navigate])
    const uploadFileHandler=async(e)=>{
        const file=e.target.files[0]
        const formData=new FormData()
        formData.append('image',file)
        setUploading(true)
        try {
            const config={
                headers:{'Content-Type':'application/json'}
            }
            const{data}=await axios.post('/api/upload',formData,config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            
        }
    }
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(productUpdate({
            
                _id: id,
                name: name,
                image: image,
                brand:brand ,
                category:category,
                description: description,
                price: price,
                countInStock: countInStock,
                numReviews:numReviews

           
        }))
       
    }
  return (
    <>
    <Link to='/admin/userProduct' className='btn btn-light my-3'>
        Go Back
    </Link>
    <FormeContainer>
        <h1>Edit Product</h1>
        {updateLoading && <Loading />}
   {updateError && <Message variant='danger'>{updateError}</Message>}
        {loading?<Loading/>:error?<Message variant='danger'>{error}</Message>:(
            <Form onSubmit={submitHandler}>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" placeholder="Enter brand" value={brand} onChange={(e)=>{setBrand(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Enter category" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="image-file">
                <Form.Label>Image</Form.Label>
                <Form.Control  label="Chose file" type='file' onChange={uploadFileHandler}/>
            </Form.Group>
            {uploading && <Loading/>}
            <Form.Group className="mb-3" controlId="formBasicCountInStock">
                <Form.Label>numReviews</Form.Label>
                <Form.Control type="number" placeholder="Enter count In Stock" value={countInStock} onChange={(e)=>{setCountInStock(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNumReviews">
                <Form.Label>number Reviews</Form.Label>
                <Form.Control type="number" placeholder="Enter number Reviews" value={numReviews} onChange={(e)=>{setNumReviews(e.target.value)}}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
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

export default ProductEditScreen