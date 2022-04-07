import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

class Blog extends React.Component{
    
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return (
            <div className='p-4' id='blog-component'>
                <div className='my-5'>
                    <h1>Welcome to our Blog Page</h1>
                    <hr /> <p><i>You can find everything on the blog page</i></p>
                </div>
                <Row>
                {this.props.getPopulerBlogPosts.map((blog)=>(
                    <Col sm={4}>
                        <Card className='my-4' id={blog.id}>         
                            <Card.Header className='text-center p-3'>
                                    <Card.Title className='w-100'>
                                        {blog.data.title}
                                    </Card.Title>
                                    <Card.Img src={blog.data.image} />
                            </Card.Header>
                            <Card.Body className='my-3 p-3'>
                                    <Card.Title className='text-center my-3'>
                                    {blog.data.title}
                                    </Card.Title>
                                    <Card.Text>{blog.data.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <div className='d-flex justify-content-between'>
                                        <div>
                                            Writer: {blog.data.writer}
                                        </div> 
                                        <div>
                                            Catagories: {blog.data.catagories} | 
                                            Date: {Date.parse(blog.data.date)}
                                        </div>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
                </Row>
            </div>
        );
    }
}

export default Blog;