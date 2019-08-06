import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"

import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { UserContainer} from '../styled';
import UserImages from '../containers/UserImages';

import LoadingIndicator from '../components/Loader';



const USERS_URL = 'https://insta.nextacademy.com/api/v1/users/'

class HomePage extends React.Component {
    state = {
        users: [],
        isLoading: true
    }

    componentDidMount() {
        axios.get(USERS_URL)
            // .then(response => response.data)         // if don't want this line, hv to destructure it like the line below
            .then(({data}) => {                         // destructure the data (the result we get here are in '{data: [array]}')
                this.setState({
                    users: data,
                    isLoading: false
                })
            })
            .catch(error => {
                console.log('ERROR: ', error)
            })
    }
  
    render() {
        const { users, isLoading } = this.state
        if (isLoading) {
            return <LoadingIndicator />
        }

        return (
            <div className="d-flex flex-column">
                <div id="content" className="d-flex flex-column">
                    {
                        users.map(user =>
                            <UserContainer className="d-flex" key={user.id}>
                                <div className="userInfo">
                                    <Link to={`/users/${user.id}`} className="username">{user.username}</Link>
                                    <Link to={`/users/${user.id}`}><img className="profileImg" src={user.profileImage}/></Link>
                                </div>
                                <UserImages userId={user.id} className=""/>
                            </UserContainer>
                        )
                    }
                </div>
            </div>
        );
    } 
}


export default HomePage;
