import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_RESET,
  ORDER_DILEVER_SUCCESS,
  ORDER_DILEVER_FAIL,
  ORDER_DILEVER_REQUEST,
  ORDER_DILEVER_RESET


  } from '../constants/orderConstants'
export const createOrderReducer=(state={},action)=>{
    switch(action.type){
     case ORDER_CREATE_REQUEST : return{loading:true}
     case ORDER_CREATE_SUCCESS : return{loading:false,success:true,order:action.payload}
     case ORDER_CREATE_FAIL : return{loading:false,error:action.payload}
  
       default: return state
  
    }
  }
  export const OrderDetailsReducer=(state={loading:true,orderItems:[],shippingAddress:{}},action)=>{
    switch(action.type){
     case ORDER_DETAILS_REQUEST : return{...state,loading:true}
     case ORDER_DETAILS_SUCCESS : return{loading:false,order:action.payload}
     case ORDER_DETAILS_FAIL : return{loading:false,error:action.payload}
  
       default: return state
  
    }
  }

  export const OrderUpdateReducer=(state={},action)=>{
    switch(action.type){
     case ORDER_UPDATE_REQUEST : return{...state,loading:true}
     case ORDER_UPDATE_SUCCESS : return{loading:false,success:true,order:action.payload}
     case ORDER_UPDATE_FAIL : return{loading:false,error:action.payload}
     case ORDER_UPDATE_RESET : return{}

  
       default: return state
  
    }
  }

  export const myOrdersReducer=(state={myOrders:[]},action)=>{
    switch(action.type){
     case ORDER_LIST_MY_REQUEST : return{...state,loading:true}
     case ORDER_LIST_MY_SUCCESS : return{loading:false,myOrders:action.payload}
     case ORDER_LIST_MY_FAIL : return{loading:false,error:action.payload}
     case ORDER_LIST_MY_RESET : return{myOrders:[]}
  
       default: return state
  
    }
  }

  export const ordersListReducer=(state={orders:[]},action)=>{
    switch(action.type){
     case ORDER_LIST_REQUEST : return{...state,loading:true}
     case ORDER_LIST_SUCCESS : return{loading:false,orders:action.payload}
     case ORDER_LIST_FAIL : return{loading:false,error:action.payload}
     case ORDER_LIST_RESET : return{orders:[]}
  
       default: return state
  
    }
  }


  export const OrderDilverReducer=(state={},action)=>{
    switch(action.type){
     case ORDER_DILEVER_REQUEST : return{...state,loading:true}
     case ORDER_DILEVER_SUCCESS : return{loading:false,success:true,order:action.payload}
     case ORDER_DILEVER_FAIL : return{loading:false,error:action.payload}
     case ORDER_DILEVER_RESET : return{}

  
       default: return state
  
    }
  }
