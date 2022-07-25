import React from 'react';
import { Card, Form, Button } from "react-bootstrap";
import db from './Firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

class EditBlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: []
    };
  }

  componentDidMount(){
    this.getPostDetails();
  }

  async getPostDetails(){
    const response = await onSnapshot(
      query(
        collection(db, 'blogs'),
        where('id', '==', this.props.id)
      ),
      (snapshop) =>
        this.setState({
          post: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="container">
        <Card className="my-3">
          <Card.Header className="text-center">
            <Card.Title>Update Blog Post</Card.Title>
          </Card.Header>
          <Card.Body className="container">
            <Form method="post" onSubmit={this.updatePost}>
              <Form.Group className="mb-3 w-100">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Blog Title"
                  id="updatePost_title"
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
                  id="updatePost_content"
                  name="content"
                  minLength={10}
                  onChange={this.handleChange}
                  value={this.state.content}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Main Image URL</Form.Label>
                <Form.Control
                  type="url"
                  id="updatePost_img"
                  name="imageUrl"
                  required
                  onChange={this.handleChange}
                  value={this.state.imageUrl}
                />
              </Form.Group>

              <Form.Group className="mb-3 w-100">
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter short description"
                  id="updatePost_description"
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
                  id="updatePost_catagories"
                  name="catagories"
                  maxLength={20}
                  onChange={this.handleChange}
                  value={this.state.catagories}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="mb-1 w-100">
                Update
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default EditBlogPost;
