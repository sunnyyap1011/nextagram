import React from 'react';
import Axios from 'axios';

import { UserImagesContainer, SelfProfilePage } from '../styled';
import LoadingIndicator from '../components/Loader';
import { toast } from 'react-toastify';
import UploadPage from './UploadPage';

class MyProfilePage extends React.Component {
    state = {
        isLoading: true,
        images: []
    }

    fetchImage = () => {
        const JWT = this.props.currentUser.jwt
        Axios({
            method: "GET",
            url: 'https://insta.nextacademy.com/api/v1/images/me',
            headers: {
                Authorization: `Bearer ${JWT}`
            }
        })
            .then(response => {
                // console.log(response)
                const images = response.data
                this.setState({
                    images,
                    isLoading: false
                })
            }
            )
            .catch(error => {
                toast.error('ERROR: ', error)
            })
    }

    componentDidMount() {
        this.fetchImage()
    }

    render() {
        const { images, isLoading } = this.state
        const {username, profilePicture} = this.props.currentUser

        if (isLoading) {
            return <LoadingIndicator height="250px" width="250px" />
        }

        return (
            <SelfProfilePage>
                <div className="userInfo">
                    <img className="profileImg" src={profilePicture} />
                    <h4 className="username">@{username}</h4>
                    <UploadPage className="uploadPage" refetch={this.fetchImage}></UploadPage>
                </div>
                <UserImagesContainer>
                    {
                        images.map((img, index) =>
                            <img key={index} src={img} />
                        )
                    }
                </UserImagesContainer>
            </SelfProfilePage>
        )
    }

}

export default MyProfilePage