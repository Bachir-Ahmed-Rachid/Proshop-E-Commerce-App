import React from "react";
import {Container} from "react-bootstrap"
import {Route,Routes} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderDetailsScreen from "./screens/OrderDetailsScreen"
import OrdersListScreen from "./screens/OrdersListScreen"
import UsersListScreen from "./screens/UsersListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"


const App=() => {
  return (
    <>
      <Header/>
        <main className="py-3">
          <Container>
          <Routes>
              <Route path='/search/:keyword' element={<HomeScreen/>} exact/>
              <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen/>}/>
              <Route path='/page/:pageNumber' element={<HomeScreen/>}/>
              <Route path='/' element={<HomeScreen/>} exact/>
              <Route path='/login' element={<LoginScreen />} exact/>
              <Route path='/shipping' element={<ShippingScreen />} exact/>
              <Route path='/payment' element={<PaymentScreen />} exact/>
              <Route path='/placeorder' element={<PlaceOrderScreen />} exact/>
              <Route path='/order/:id' element={<OrderDetailsScreen />} exact/>
              <Route path='/admin/userOrders' element={<OrdersListScreen />} exact/>
              <Route path='/cart/:id' element={<CartScreen />} exact/>
              <Route path='/profile' element={<ProfileScreen />} exact/>
              <Route path='/register' element={<RegisterScreen />} exact/>
              <Route path='/products/:id' element={<ProductScreen />} exact/>
              <Route path='/admin/userProduct' element={<ProductListScreen />} exact/>
              <Route path='/admin/userProduct/:pageNumber' element={<ProductListScreen />} exact/>
              <Route path='/admin/userProduct/:id/edit' element={<ProductEditScreen />} exact/>
              <Route path='/cart' element={<CartScreen />} exact/>
              <Route path='/cart/:id' element={<CartScreen />} exact/>
              <Route path='/admin/userList' element={<UsersListScreen />} exact/>
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} exact/>
          </Routes>
          </Container>
          
        </main>     
      <Footer/>
    </>
  );
}

export default App;
