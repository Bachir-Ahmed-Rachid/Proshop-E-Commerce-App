import {ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_UPDATE_REQUEST,
    ORDER_UPDATE_SUCCESS,
    ORDER_UPDATE_FAIL,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
     ORDER_LIST_MY_REQUEST,
     ORDER_LIST_SUCCESS,
     ORDER_LIST_FAIL,
     ORDER_LIST_REQUEST,
     ORDER_DILEVER_SUCCESS,
     ORDER_DILEVER_FAIL,
     ORDER_DILEVER_REQUEST,
   
   
    } from '../constants/orderConstants'
import axios from 'axios'
export const createOrder=(order)=> async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_CREATE_REQUEST  
        })
        const{userInfo}=getState().userLogin
        const config={
            headers:{'Content-Type':'application/json',authorization:`Bearer ${userInfo.token}`}
        }
        const {data}=await axios.post('/api/orders',order,config)
        dispatch({
            type:ORDER_CREATE_SUCCESS ,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_CREATE_FAIL,
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}
export const orderDetails=(id)=> async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_DETAILS_REQUEST  
        })
        const{userInfo}=getState().userLogin
        const config={
            headers:{authorization:`Bearer ${userInfo.token}`}
        }
        const {data}=await axios.get(`/api/orders/${id}`,config)
        dispatch({
            type:ORDER_DETAILS_SUCCESS ,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}
export const orderUpdate=(id,paymentResult)=> async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_UPDATE_REQUEST  
        })
        const{userInfo}=getState().userLogin
        const config={
            headers:{'Content-Type':'application/json',
                authorization:`Bearer ${userInfo.token}`}
        }
        const {data}=await axios.put(`/api/orders/${id}/payed`,paymentResult,config)
        dispatch({
            type:ORDER_UPDATE_SUCCESS ,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_UPDATE_FAIL,
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const getMyOrders=()=> async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_LIST_MY_REQUEST  
        })
        const{userInfo}=getState().userLogin
        const config={
            headers:{authorization:`Bearer ${userInfo.token}`}
        }
        const {data}=await axios.get('/api/orders/myOrders',config)
        dispatch({
            type:ORDER_LIST_MY_SUCCESS ,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_LIST_MY_FAIL,
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const getOrders=()=> async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_LIST_REQUEST  
        })
        const{userInfo}=getState().userLogin
        const config={
            headers:{authorization:`Bearer ${userInfo.token}`}
        }
        const {data}=await axios.get('/api/orders',config)
        dispatch({
            type:ORDER_LIST_SUCCESS ,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_LIST_FAIL,
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}

export const orderDilevered=(id)=> async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_DILEVER_REQUEST  
        })
        const{userInfo}=getState().userLogin
        const config={
            headers:{
                authorization:`Bearer ${userInfo.token}`}
        }
        const {data}=await axios.put(`/api/orders/${id}/dilevered`,{},config)
        dispatch({
            type:ORDER_DILEVER_SUCCESS ,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:ORDER_DILEVER_FAIL,
            payload:error.response && error.response.data.message?error.response.data.message:error.message
        })
    }
}
