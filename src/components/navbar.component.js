import React , {Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class Header extends Component {

    logOut = ()=>{
        sessionStorage.clear();
        this.props.history.push('/users/login')
    }
    render(){
        const login =<React.Fragment>
                          <Nav.Link className="navbar-item">
                            <Link to="/user" className="nav-link">Sign Up</Link>
                        </Nav.Link>
                        <Nav.Link className="navbar-item">
                            <Link to="/users/login" className="nav-link">Log In</Link>
                        </Nav.Link>
                        </React.Fragment>
                    
        const logout =   <React.Fragment>
                            <Nav.Link className="navbar-item">
                                <Link to="/show" className="nav-link">Attendance</Link>
                            </Nav.Link>
                            <Nav.Link className="navbar-item">
                                <Link to="/create" className="nav-link">Add New Course</Link>
                            </Nav.Link>
                            <Nav.Link className="navbar-item">
                                <Link onClick={this.logOut} className="nav-link">Log Out</Link>
                            </Nav.Link>
                            </React.Fragment>
        return (
            <div className="container-fluid">
            <Navbar collapseOnSelect expand="lg" className="bg-info">
                <Navbar.Brand href="/">Attendance Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="navbar-nav mr-auto">
                            {
                                sessionStorage.token ? logout : login
                            }
                        </Nav>
                </Navbar.Collapse>
            </Navbar>
            </div>
        );
    }
}

export default withRouter(Header)