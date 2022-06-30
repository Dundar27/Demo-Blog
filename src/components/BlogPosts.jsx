import React from 'react';
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const BlogPosts = (props) => { 

    return(
        <Row>
            {props.BlogPosts.map((blog)=>(
            <Col sm={6} >      
                <Card className='my-4 mx-3' id={blog.id}>         
                    <Card.Header className='text-center p-3'>
                        <Card.Title className='w-100'>
                            {blog.data.title}
                        </Card.Title>
                    </Card.Header>

                    <Card.Body className="conteiner">
                        <Card.Img src={blog.data.image} className="d-block w-100" alt="Blog image_"/>
                        <div className='mt-3'> 
                            <Card.Text className='p-3'>
                                {blog.data.description}
                            </Card.Text>        
                        </div>
                        <Link to={'blog/post/'+blog.id} className="btn btn-outline-primary btn-rounded">Read the Blog Post</Link>
                    </Card.Body>
                    
                    <Card.Footer className='mt-2'>  
                        <div className='d-flex justify-content-between'>
                            <div>
                                Writer: {blog.data.writer}
                            </div> 
                            <div>
                                Catagories: {blog.data.catagories} <br />
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