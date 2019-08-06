import React from 'react';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { withRouter } from 'react-router'


import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button,
    Form,
    FormGroup,
} from 'reactstrap';



class NavigationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            showModal: false,
            isLogin: false,
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    openModal = (modal) => {
        if (modal == 'login') {
            this.setState({
                showModal: true,
                isLogin: true
            })
        } else {
            this.setState({
                showModal: true,
                isLogin: false
            })
        }
    }

    closeModal = () => {
        this.setState({
            showModal: false,
            isLogin: false
        })
    }

    switchModal = (modal) => {
        if (modal == 'login') {
            this.setState({
                isLogin: true
            })
        } else {
            this.setState({
                isLogin: false
            })
        }
    }


    goToHome = e => {
        e.preventDefault()
        this.props.history.push('/')
    }

    logOut = () => {
        localStorage.removeItem("JWT")
        localStorage.removeItem("username")
        localStorage.removeItem("userId")
        localStorage.removeItem("profilePicture")
        this.props.updateUser('')
        this.props.history.push('/')
    }

    render() {
        const { showModal, isLogin } = this.state

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand onClick={this.goToHome} href="/" className="font-weight-bold">Nextagram</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Form inline>
                                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                        <Input type="search" />
                                    </FormGroup>
                                    <Button outline color="info" className="mb-2 mr-sm-2 mb-sm-0">Search</Button>
                                </Form>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/" className="text-dark ml-2 pl-1">Home</NavLink>
                            </NavItem>
                            {
                                (this.props.currentUser.jwt) ?
                                    <>
                                        <NavItem>
                                            <NavLink href="/profile" className="text-dark ml-1">My Profile</NavLink>
                                            {/* <NavLink href="/users" className="text-dark ml-2 pl-1">Users</NavLink> */}
                                        </NavItem>
                                        <NavItem>
                                            <Button color="secondary" onClick={this.logOut} >Log Out</Button>
                                        </NavItem>
                                    </>
                                    :
                                    <>
                                        <NavItem>
                                            <Button color="link" onClick={() => {
                                                this.openModal('login')
                                            }}>Login</Button>
                                        </NavItem>
                                        <NavItem>
                                            <Button color="primary" onClick={() => {
                                                this.openModal('signup')
                                            }}>Sign Up</Button>
                                        </NavItem>
                                    </>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
                {showModal ? (isLogin ?
                    <LoginModal history={this.props.history} open={showModal} switch={this.switchModal} close={this.closeModal} login={this.login} updateUser={this.props.updateUser} />
                    : <SignUpModal history={this.props.history} open={showModal} switch={this.switchModal} close={this.closeModal} login={this.login} updateUser={this.props.updateUser}/>) : null}
            </div>
        )
    }
}

export default withRouter(NavigationBar)