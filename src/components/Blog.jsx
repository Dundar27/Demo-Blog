import React from 'react';
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
                <Card className='my-5'>         
                   <Card.Header className='text-center p-3'>
                        <h2>example</h2>
                        <Card.Img src={"example"} />
                   </Card.Header>
                   <Card.Body className='my-3 p-3'>
                        <Card.Title className='text-center my-3'>
                        example
                        </Card.Title>
                        <Card.Text>example</Card.Text>
                   </Card.Body>
                   <Card.Footer className="text-muted">
                       <div className='d-flex justify-content-between'>
                            <div>
                                Writer: example
                            </div> 
                            <div>
                                Catagories: example | 
                                Date: example
                            </div>
                       </div>
                    </Card.Footer>
               </Card>
            </div>
        );
    }
}

export default Blog;