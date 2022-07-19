import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, ListGroup, Alert } from "react-bootstrap";
import BlogPosts from "./BlogPosts";

const MainSection = (props) => {

  return (
    <div className='p-3' id='blogs-component'>
      <Row className='mt-1'>
        <Col sm={8} className='row p-2'>
          <BlogPosts BlogPosts={props.getPopulerBlogPosts} />
        </Col>

        <Col sm={4} className='p-2 my-3 help-box'>
          <Card>
            <Card.Header>
              <Card.Title>Help Box</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card className='text-dark my-3'>
                <Card.Header>
                  <Card.Title>Blog Pages</Card.Title>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item >
                      <Link to={'/writers/'}>Writers</Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to={'blog/catagories/'}>Catagories</Link>
                    </ListGroup.Item>
                    <ListGroup.Item >
                      <Link to={'blog/populer-blogs/'}>Populer Blog Posts</Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
              <Card className='text-dark my-3'>
                <Card.Header>
                  <Card.Title>Contact for front-end developer</Card.Title>
                </Card.Header>
                <Card.Body>
                  <a href={"https://www.github.com/Dundar27"} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-github fa-2x mx-2 text-dark"></i>
                  </a>
                  <a href={"https://www.instagram.com/davut_burak_/"} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-instagram fa-2x mx-2 text-dark"></i>
                  </a>
                  <a href={"https://tr.linkedin.com/in/davutburak"} target="_blank" rel="noopener noreferrer">
                    <i class="fab fa-linkedin fa-2x mx-2 text-dark"></i>
                  </a>
                </Card.Body>
              </Card>
              <Alert variant="warning" className="my-3" role="alert">
                <Alert.Heading>Warning</Alert.Heading>
                <p>
                  Our site is still under development. You are now using the demo version. If you've discovered a bug, please let us know.
                </p>
              </Alert>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default MainSection;