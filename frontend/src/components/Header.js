import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {Container,Nav,Navbar,NavDropdown} from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import {logout} from '../actions/userActions.js'
import SearchBox from './SearchBox'
 
const Header = () => {
  const{userInfo}=useSelector(state=>state.userLogin)
  const dispatch=useDispatch()
  const logoutHandler=()=>{
    dispatch(logout())}
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container >
        <LinkContainer className='me-auto p-2 bd-highlight' to='/'><Navbar.Brand>ProShop</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <SearchBox/>
        <Navbar.Collapse className='d-flex justify-content-end' id="basic-navbar-nav">
        
          <Nav>
          <LinkContainer to='/cart'><Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link></LinkContainer>
          {userInfo?
           (<NavDropdown id='username' title={userInfo.name}>
            <LinkContainer to='/profile'>
                <NavDropdown.Item >Profile</NavDropdown.Item>
             </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
           </NavDropdown>):
          (<LinkContainer to='/login'><Nav.Link><i className='fas fa-user'></i>Sign in</Nav.Link></LinkContainer>)
                  }
          {userInfo && userInfo.isAdmin &&(
            <NavDropdown id='amin' title='Admin'>
                <LinkContainer to='/admin/userList'>
                    <NavDropdown.Item >Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/userOrders'>
                    <NavDropdown.Item >Orders</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/userProduct'>
                    <NavDropdown.Item >Product</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header