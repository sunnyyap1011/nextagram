import React from 'react'
import axios from 'axios'
import '../App.css';
import { UserImagesContainer} from '../styled';
import LoadingIndicator from '../components/Loader';
import 'bootstrap/dist/css/bootstrap.css'
import Image from "react-graceful-image";


export default class UserImages extends React.Component {
    state = {
        images: [],
        isLoading: true
    }

    componentDidMount() {
        axios.get(`https://insta.nextacademy.com/api/v1/images/?userId=${this.props.userId}`)
            // .then(response => response.data)
            .then((resp) => {
                let images = resp.data
                this.setState({
                    images,
                    isLoading: false
                })
            })
    }

    render() {
        const { images, isLoading } = this.state
        const {userId} = this.props
        
         
        if (isLoading) {
            return <LoadingIndicator height="250px" width="250px" />
            // return <Image width="100" height="100" />
        }

        return (
            <UserImagesContainer className="d-flex flex-wrap userImageContainer">
                {
                    images.map((img, index) =>
                        <img key={index} userid={userId} src={img} />
                    )
                }
            </UserImagesContainer>
        )
    }
    
}