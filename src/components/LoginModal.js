import React from 'react';
import Axios from 'axios';
import { Redirect } from "react-router-dom"

import '../App.css';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormFeedback, FormGroup, Label, Input, Form } from 'reactstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class LoginModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: this.props.open,
            username: '',
            password: '',
            usernameExists: false
        }
        this.delay = null;
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.close()
        Axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/login',
            data: {
                username: this.state.username,
                password: this.state.password
            }
        })
            .then(response => {
                if (response.data.status == 'success') {
                    const { user, auth_token } = response.data
                    toast.success(`${user.username} have login successfully !`)
                    localStorage.setItem('JWT', auth_token)
                    localStorage.setItem('username', user.username)
                    localStorage.setItem('profilePicture', user.profile_picture)
                    localStorage.setItem('userId', user.id)
                    const data = {
                        username: user.username,
                        userId: user.id,
                        profilePicture: user.profile_picture,
                        jwt: auth_token
                    }
                    this.props.updateUser(data)
                    this.props.history.push('/profile')
                }
            })
            .catch(error => {
                console.log( error)
                toast.error('Login failed, your username or password is incorrect. Please try again.')
                // response.data.message.forEach(msg =>
                //     toast.error(msg)
                // )
            })
    }



    handleInput = (e) => {
        const { id, value } = e.target
        if (this.delay) clearTimeout(this.delay)
        if (id == 'username') {
            this.delay = setTimeout(() => { this.usernameExists(value) }, 300)
        }
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    usernameExists = name => {
        if (name.length >= 6) {
            Axios.get(`https://insta.nextacademy.com/api/v1/users/check_name?username=${name}`)
                .then(response => {
                    if (response.data.exists) {
                        this.setState({
                            usernameExists: true
                        })
                    } else {
                        this.setState({
                            usernameExists: false
                        })
                    }
                })
        }
    }


    render() {
        const { showModal, username, password, usernameExists } = this.state
        // if (this.props.currentUser.jwt) {return <Redirect to="/profile" />}
        return (
            <div>
                <Modal isOpen={showModal} toggle={() => this.props.close()} className={this.props.className}>
                    <Form onSubmit={this.handleSubmit}>
                        <ModalHeader toggle={() => this.props.close()}>Login</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" placeholder="" onChange={this.handleInput} {...(username.length > 5 ? usernameExists ? { valid: true } : { invalid: true } : '')} />
                                <FormFeedback>
                                    {username.length > 5 ? usernameExists ? "" : "Username does not exists" : ""}
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="" onChange={this.handleInput} {...(password.length >= 8 ? { valid: true } : password.length > 0 ? { invalid: true } : "")} />
                                <FormFeedback>
                                    {password.length < 8 ? "Your password is too short" : ""}
                                </FormFeedback>
                            </FormGroup>
                            <p>New member? <span className="text-info" onClick={() => { this.props.switch('signup') }}>Sign up here.</span></p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.handleSubmit} disabled={(password.length < 8) || (!username.length)} >Login</Button>{' '}
                            <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}


export default LoginModal