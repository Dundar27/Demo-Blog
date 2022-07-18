import React from "react";
import db from "./Firebase";
import { auth, storage } from "./Firebase";
import { setDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Card, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

class CreateBlogPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      image: "",
      imageUrl: null,
      description: "",
      catagories: ""
    };
  }

  createPost = async (e) => {
    e.preventDefault();

    const id = uuidv4();
    const date = new Date();

    const storageRef = ref(
      storage,
      `/post_image/${auth.currentUser.displayName}/${this.state.image.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, this.state.image);

    // Listen for state changes, errors, and completion of the upload.
    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;
          case "storage/unknown":
            console.log("Unknown error occurred, inspect error.serverResponse");
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.setState({ imageUrl: downloadURL });
        });
      }
    );

    await setDoc(doc(db, "blogs", id),
      {
        id: id,
        title: this.state.title,
        content: this.state.content,
        image: this.state.imageUrl,
        description: this.state.description,
        catagories: this.state.catagories,
        date: date,
        writter: auth.currentUser.displayName,
      });

    window.location = "/profile/settings/";
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeFile = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  render() {
    return (
      <div className="container">
        <Card className="my-3">
          <Card.Header className="text-center">
            <Card.Title>Create Blog Post</Card.Title>
          </Card.Header>
          <Card.Body className="container">
            <Form method="post" onSubmit={this.createPost}>
              <Form.Group className="mb-3 w-100">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Blog Title"
                  id="createPost_title"
                  name="title"
                  minLength={10}
                  maxLength={60}
                  onChange={this.handleChange}
                  value={this.state.title}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={20}
                  id="createPost_content"
                  name="content"
                  minLength={10}
                  onChange={this.handleChange}
                  value={this.state.content}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Main Image</Form.Label>
                <Form.Control
                  type="file"
                  id="createPost_img"
                  name="image"
                  required
                  onChange={this.handleChangeFile}
                />
              </Form.Group>

              {/*<Form.Group className="mb-3">
                <Form.Label>Main Image URL</Form.Label>
                <Form.Control
                  type="url"
                  id="createPost_img"
                  name="image"
                  required
                  onChange={this.handleChange}
                  value={this.state.image}
                />
              </Form.Group>*/}

              <Form.Group className="mb-3 w-100">
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter short description"
                  id="createPost_description"
                  name="description"
                  minLength={10}
                  maxLength={150}
                  onChange={this.handleChange}
                  value={this.state.description}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3 w-100">
                <Form.Label>Catagories</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the categories, but remember that the categories should be short and easy"
                  id="createPost_catagories"
                  name="catagories"
                  maxLength={20}
                  onChange={this.handleChange}
                  value={this.state.catagories}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="mb-1 w-100">
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default CreateBlogPost;
