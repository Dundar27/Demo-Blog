import React from 'react';
//import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

class Blog extends React.Component{
    
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return (
            <div className='p-4'>
               {this.props.getBlogPosts.map((posts)=>(
                <Card className='my-5'>         
                   <Card.Header className='text-center p-3'>
                        <h2>{posts.data.title}</h2>
                        <Card.Img src={posts.data.image} />
                   </Card.Header>
                   <Card.Body className='my-3 p-3'>
                        <Card.Title className='text-center my-3'>
                            {posts.data.title}
                        </Card.Title>
                        <Card.Text>{posts.data.content}</Card.Text>
                   </Card.Body>
                   <Card.Footer className="text-muted">
                       <div className='d-flex justify-content-between'>
                            <div>
                                Writer: {posts.data.writer}
                            </div> 
                            <div>
                                Catagories: {posts.data.catagories} | 
                                Date: {posts.data.date}
                            </div>
                       </div>
                    </Card.Footer>
               </Card>
               ))}
            </div>
        );
    }
}

export default Blog;