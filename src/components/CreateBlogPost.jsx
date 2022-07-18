import React from "react";
import db, { auth, storage } from "./Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { Card, Form, Button, ProgressBar } from "react-bootstrap";

class CreateBlogPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      img: "",
      imgUrl: null,
      description: "",
      catagories: "",
      progresspercent: 0,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeFile = (e) => {
    this.setState({
      img: e.target.files[0],
    });
  };

  createPost = async (e) => {
    let id = Math.floor(Math.random() * 100) * Math.floor(Math.random() * 100);
    let date = new Date().getDate();
    const storageRef = ref(
      storage,
      `/post_image/${auth.currentUser.displayName}/${this.state.img.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, this.state.img);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
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
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.setState({ imgUrl: downloadURL });
        });
      }
    );
    setDoc(doc(db, "blogs", id.toString()), {
      id: id,
      title: this.state.title,
      content: this.state.content,
      img: this.state.imgUrl,
      description: this.state.description,
      catagories: this.state.catagories,
      date: date,
      writter: auth.currentUser.displayName,
    }).catch((error) => alert(error));

    window.location = "/profile/settings/";
  };

  render() {
    return (
      <div className="container">
        <Card className="my-3">
          <Card.Header className="text-center">
            <Card.Title>Create Blog Post</Card.Title>
          </Card.Header>
          <Card.Body className="container">
            <Form onSubmit={this.createPost}>
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
                  name="img"
                  required
                  onChange={this.handleChangeFile}
                /> <br />
                {!this.state.imgUrl && (
                  <ProgressBar now={this.state.progresspercent} label={`${this.state.progresspercent}%`} />
                )}
                {this.state.imgUrl && (
                  <Card.Text className="text-center">Uploaded file</Card.Text>
                )}
              </Form.Group>

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
