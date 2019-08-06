import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Form, FormFeedback } from 'reactstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';


class SignUpModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: this.props.open,
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            usernameValid: false,
            emailValid: false,
        }
        this.delay = null
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.close()
        Axios({
            method: 'POST',
            url: 'https://insta.nextacademy.com/api/v1/users/',
            data: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
        })
            .then(response => {
                console.log(response)
                const { user, auth_token } = response.data
                toast.success(`${response.data.message}`)
                
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
            })
            .catch(error => {
                console.error(error.response.data.message)
                error.response.data.message.forEach(msg =>
                    toast.error(msg)
                )
            })
    }

    handleInput = (e) => {
        let x = { ...e }
        if (this.delay) clearTimeout(this.delay)
        if (e.target.id == 'email') {
            this.handleEmailCheck(x)
        }
        if (e.target.id == 'username') {
            this.delay = setTimeout(() => { this.handleUsernameCheck(x) }, 300)
        }
        // let delay = setTimeout(() => this.handleUsernameCheck(x), 300)
        this.setState({
            [e.target.id]: e.target.value,
            // delay
        })
    }

    handleUsernameCheck = e => {
        const newUsername = e.target.value;
        if (newUsername.length >= 6) {
            Axios.get(`https://insta.nextacademy.com/api/v1/users/check_name?username=${newUsername}`)
                .then(response => {
                    if (response.data.valid) {
                        this.setState({
                            usernameValid: true
                        })
                    } else {
                        this.setState({
                            usernameValid: false
                        })
                    }
                })
        }
    }

    handleEmailCheck = e => {
        const newEmail = e.target.value
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (newEmail.length) {
            if (regex.test(newEmail)) {
                this.setState({
                    emailValid: true
                })
            } else {
                this.setState({
                    emailValid: false
                })
            }
        }
    }


    render() {
        const { username, email, password, confirmPassword, usernameValid, emailValid } = this.state
        console.log(this.state)

        const usernameValidation =
            (username.length >= 5
                ? (usernameValid
                    ? { valid: true }
                    : { invalid: true })
                : (username.length > 0
                    ? { invalid: true }
                    : ""))
        const emailValidation = (email.length > 0 ? emailValid ? { valid: true } : { invalid: true } : "")
        const passwordValidation = (password.length >= 8 ? { valid: true } : password.length > 0 ? { invalid: true } : "")
        const confirmPasswordValidation = (confirmPassword.length ? confirmPassword == password ? { valid: true } : { invalid: true } : "")

        return (
            <div>
                <Modal isOpen={this.state.showModal} toggle={this.props.close} className={this.props.className}>
                    <ModalHeader toggle={this.props.close}>Sign Up</ModalHeader>
                    <Form>
                        <ModalBody>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="between 5 and 20 characters"
                                    value={username}
                                    onChange={this.handleInput}
                                    {...usernameValidation}
                                />
                                <FormFeedback {...(username.length >= 5? (usernameValid? { valid: true } : { valid: false }) : (username.length > 0 ? { valid: false } : ""))}>
                                    {
                                        username.length >= 5 ?
                                            usernameValid ?
                                                "Sweet, this username is available!"
                                                : "Sorry, this username is taken!" : "At least 5 characters"
                                    }
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="abc@example.com"
                                    value={email}
                                    onChange={this.handleInput}
                                    {...emailValidation}
                                />
                                <FormFeedback {...(email.length > 0 ? emailValid ? { valid: true } : { valid: false } : "")}>
                                    {
                                        email.length > 0 ?
                                            emailValid ?
                                                `${email} is valid`
                                                : `${email} is NOT valid`
                                            : ''
                                    }
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="at least 8 characters"
                                    value={password}
                                    onChange={this.handleInput}
                                    {...passwordValidation}
                                />
                                <FormFeedback {...(password.length >= 8 ? { valid: true } : password.length > 0 ? { valid: false } : "")}>
                                    {
                                        password.length >= 8 ?
                                            ""
                                            : password.length == 0 ?
                                                ""
                                                : "Your password is too short"
                                    }
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup>
                                <Label for="confirmPassword">Confirm Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="confirmPassword"
                                    placeholder="key in your password again"
                                    value={confirmPassword}
                                    onChange={this.handleInput}
                                    {...confirmPasswordValidation}
                                />
                                <FormFeedback {...(confirmPassword.length ? confirmPassword == password ? { valid: true } : { valid: false } : "")}>
                                    {
                                        confirmPassword == password ?
                                            "Password confirmed"
                                            : "The password does not match the original password above"
                                    }
                                </FormFeedback>
                            </FormGroup>

                            <p>Already a member? <Button color="link" onClick={() => { this.props.switch('login') }}>Login here.</Button></p>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={this.handleSubmit} disabled={(password.length < 8) || (!email.length) || (username.length < 5 || username.length > 20) || (password != confirmPassword)}>Sign Up</Button>{' '}
                            <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default SignUpModal

//{...(username.length > 0 && username.length >= 5 ? usernameValid ? { valid: true } : { invalid: 'true' } : { invalid: 'true' })}
