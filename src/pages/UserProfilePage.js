import React from "react"
import axios from 'axios';

import UserImages from "../containers/UserImages";
import { UserPage } from "../styled";
import 'bootstrap/dist/css/bootstrap.css';


class UserProfilePage extends React.Component {
    state = {
        user: [],
    }

    componentDidMount() {
        axios.get(`https://insta.nextacademy.com/api/v1/users/${this.props.match.params.id}`)
            .then(resp => {
                let user = resp.data
                this.setState({
                    user
                })
            })
    }

    render() {
        const { user } = this.state
        console.log(this.props.currentUser)

        return (
            <UserPage>
                <div className="userInfo">
                    {/* <h1>ID: {this.props.match.params.id}</h1> */}
                    <img className="profileImg" src={user.profileImage} />
                    <h3 className="username">@{user.username}</h3>
                </div>

                <UserImages userId={this.props.match.params.id} className="" />
            </UserPage>
        )
    }
}

export default UserProfilePage