import React from 'react';
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const BlogPosts = (props) => {

  return (
    <Row>
      {props.BlogPosts.map((blog) => (
        <Col sm={6} >
          <Card className='my-4 mx-3'>
            <Card.Header className='text-center p-3'>
              <Card.Title className='w-100'>
                {blog.data.title}
              </Card.Title>
            </Card.Header>

            <Card.Body className="conteiner">
              <Card.Img src={blog.data.image} className="d-block w-100" alt="Blog image_" />
              <div className='mt-3'>
                <Card.Text className='p-3'>
                  {blog.data.description}
                </Card.Text>
              </div>
              <Link to={'post/' + blog.id} className="btn btn-outline-primary btn-rounded">Read the Blog Post</Link>
            </Card.Body>

            <Card.Footer className='mt-2'>
              <div className='d-flex justify-content-between'>
                <div>
                  Writer: <Link to={'/profile/' + blog.data.writer} className="p-1 btn btn-outline-dark"> {blog.data.writer} </Link>
                </div>
                <div>
                  Catagories: <Link to={'/blog/catagories/' + blog.data.catagories} className="btn p-1 btn-outline-dark"> {blog.data.catagories} </Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default BlogPosts;