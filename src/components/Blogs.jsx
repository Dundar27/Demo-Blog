import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, ListGroup, Alert, Button } from "react-bootstrap";

const Blogs = (props) => {  
    
    return (
        <div className='p-3' id='blogs-component'>
            <Row className='mt-3'>
                <Col sm={8} className='row p-2'>
                    {props.getPopulerBlogPosts.map((blog)=>(
                        <Col sm={6}>
                            <Card className='card m-3 p-0' id={blog.id}>
                                <Card.Header className='mb-2'>
                                    <Card.Title>Popular Blog Posts</Card.Title> 
                                </Card.Header>
                                <Card.Body className="conteiner">
                                    <Card.Img src={blog.data.image} className="d-block w-100" alt="Blog image_"/>
                                    <div className='mt-5'> 
                                        <Card.Title className='text-center'>
                                            {blog.data.title}
                                        </Card.Title>
                                        <Card.Text className='p-3'>
                                            {blog.data.description}
                                        </Card.Text>        
                                    </div> 
                                    <Link to={'blog/'+blog.id} className="btn btn-outline-primary btn-rounded">Read the Blog Post</Link>
                                </Card.Body>
                                <Card.Footer className='mt-2'>  
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            Writer: {blog.data.writer}
                                        </div> 
                                        <div className='d-flex justify-content-between'>
                                            <Button variant="success" className='p-2 mx-1' id="like">
                                                <i class="fa fa-thumbs-up"></i> <span >{blog.data.like}</span>
                                            </Button>
                                            <Button variant="danger" className='p-2 mx-1'>
                                                <i class="fa fa-thumbs-down"></i> <span >{blog.data.dislike}</span>
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Footer>    
                            </Card>
                        </Col>
                    ))}
                </Col>
                <Col sm={4} className='p-2 my-3'>
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
                                        <ListGroup.Item action href={'blog/catagories/'}>
                                            Catagories
                                        </ListGroup.Item>
                                        <ListGroup.Item action href={'blog/populer-blogs/'}>
                                            Populer Blog Posts
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                            <Card className='text-dark my-3'>
                                <Card.Header>
                                    <Card.Title>The Editor Social Media</Card.Title>
                                </Card.Header>
                                <Card.Body>
                                    <Link to={"https://www.github.com/Dundar27"} target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-github fa-2x mx-2 text-dark"></i>
                                    </Link>
                                    <Link to={"https://www.instagram.com/davut_burak_/"} target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-instagram fa-2x mx-2 text-dark"></i>
                                    </Link>
                                    <Link to={"https://tr.linkedin.com/in/davutburak"} target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-linkedin fa-2x mx-2 text-dark"></i>
                                    </Link>
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

export default Blogs;