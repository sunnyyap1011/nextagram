import React from 'react';
import Axios from 'axios';

import '../App.css';

import { Button, FormGroup, Input, Form, FormText, Label, Card, CardImg, CardBody,
     CardFooter, CardHeader } from 'reactstrap';
import { toast } from 'react-toastify';


class UploadPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageFile: null,
            previewImage: null,
            message: null
        }
    }

    handleFile = e => {
        this.setState({
            previewImage: URL.createObjectURL(e.target.files[0]),
            imageFile: e.target.files[0]
        })
    }

    handleSubmitFile = (e) => {
        e.preventDefault();
        // Authorization of the user
        let JWT = localStorage.getItem("JWT");
        // Formdata object to hold the image file to send to the server
        let formData = new FormData();
        // Append the key:value pair to the formData object
        formData.append("image", this.state.imageFile);
        this.setState({
            previewImage: 'https://media.tenor.com/images/d5015577b1133a47299b149b6fab1aaa/tenor.gif'
        })

        Axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
            headers: { Authorization: `Bearer ${JWT}` }
        })
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    this.setState({
                        previewImage: null,
                        imageFile: null
                    });
                    toast.success("Image Uploaded Successfully!")
                    console.log(response.data.image_url)
                    this.props.refetch()
                } 
            })
            .catch(error => {
                console.log(error.response);
            });

    }

    render() {
        const { previewImage, message } = this.state
        const styles = {
            centerBox: {
                color: 'grey',
            }
        }
        return (
            <Card style={{maxWidth:"300px"}}>
                <Form onSubmit={
                    this.handleSubmitFile
                }>
                    <FormGroup>
                        {previewImage ? (
                            <CardImg
                                src={previewImage}
                                style={styles.centerBox}
                                // className="img-thumbnail"
                                // style={{width:"100px", height:"100px"}}
                            />
                        ) : (
                                <CardHeader tag="h5"
                                    style={styles.centerBox}
                                    >
                                    {message ? message : "Live Preview"}
                                </CardHeader>
                            )}
                        <CardBody className="d-flex flex-column">
                            <Input
                                type="file"
                                name="image-file"
                                id="file"
                                className="inputfile"
                                onChange={
                                    this.handleFile
                                }
                            />
                            <Label for="file" className="text-center">Choose a file</Label>
                            <FormText color="muted">
                                Make sure the image being uploaded is a supported format.
                            </FormText>
                        </CardBody>
                    </FormGroup>
                    <CardFooter>
                        <Button type="submit" color="success" className="uploadBtn" disabled={!this.state.imageFile}>
                            Upload
                        </Button>
                    </CardFooter>
                </Form>
            </Card>
        )
    }
}

export default UploadPage