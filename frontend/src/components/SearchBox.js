import React,{useState} from 'react'
import{Form,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
const SearchBoxScreen = () => {
    const navigate=useNavigate()
    const[keyword,setKeyword]=useState('')
    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/search/${keyword}`)
        }else{
            navigate('/')
        }
    }
  return (
    <Form onSubmit={submitHandler} className='d-flex justify-content-between'>
        <Form.Control
        type='text'
        name='q'
        onChange={(e)=>setKeyword(e.target.value)}
        placeholder='Search Product...'
        className='mr-sm-2 ml-sm-5'>
        </Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
    </Form>
  )
}

export default SearchBoxScreen