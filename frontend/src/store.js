import{createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer,
    productDetailReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productCreatReviewReducer,
    productTopListReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducer'
import {userUpdateReducer,
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userProfileUpdatesReducer,
    userListReducer,
    userDeleteReducer,
} from './reducers/userReducers'
import {createOrderReducer,
    OrderDetailsReducer,
    OrderUpdateReducer,
    myOrdersReducer,
    ordersListReducer,
    OrderDilverReducer
} from './reducers/orderReducers'
const reducer=combineReducers({
    productList:productListReducer,
    productDetail:productDetailReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    updateProduct:productUpdateReducer,
    productAddReview:productCreatReviewReducer,
    topProduct:productTopListReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdate:userProfileUpdatesReducer,
    deleteUser:userDeleteReducer,
    allUsers:userListReducer,
    updateUser:userUpdateReducer,
    orderCreat:createOrderReducer,
    OrderDetails:OrderDetailsReducer,
    orderUpdate:OrderUpdateReducer,
    myOrders:myOrdersReducer,
    ordersList:ordersListReducer,
    orderDilever:OrderDilverReducer
})
const cartItemFormStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]
const userInfoFormStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const shippingAddressFormStorage=localStorage.getItem('ShippingAddress')?JSON.parse(localStorage.getItem('ShippingAddress')):{}
const initialState={cart:{cartItems:cartItemFormStorage,shippingAddress:shippingAddressFormStorage},userLogin:{userInfo:userInfoFormStorage}}
const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store