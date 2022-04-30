import React from 'react';
import { Link } from "react-router-dom";
import { Card, Row, Col } from 'react-bootstrap';
import SearchBar from './SearchBar';

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
                    <h1>Welcome To Our Blog Page</h1>
                    <hr /> <p><i>You can find everything on the blog page</i></p>
                </div>

                <SearchBar searchProp={this.props.searchProp}/>

                <Row>
                    {this.props.getPopulerBlogPosts.map((blog)=>(
                        <Col sm={4}>
                            <Card className='my-4' id={blog.id}>         
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
                                    <Link to={'blog/post-'+blog.id} className="btn btn-outline-primary btn-rounded">Read the Blog Post</Link>
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
            </div>
        );
    }
}

export default Blog;