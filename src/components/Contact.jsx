import React from "react";
import { Form, Button, Row, Col, Figure } from 'react-bootstrap';

class Contact extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:"",
            email:""
        }
    }

    contactForm = async(e) => {
        e.preventDefault();

        
    }

    handleChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        return(
            <div className="container my-5 contact">
                <h1 className="text-center">Contact Us</h1> <br />
                <Row>
                    <Col sm={6} >
                        <div>
                            <Figure>
                                <Figure.Image
                                    width={520}
                                    alt="image not found"
                                    src="https://www.hostinger.com.br/tutoriais/wp-content/uploads/sites/12/2021/03/O-Que-E-Um-Blog-Uma-Introducao-ao-Blogging.png"
                                />
                            </Figure>

                            <div>
                                <a href="tel:+905359791374"> 
                                    <i class="fas fa-phone-alt"></i> +90 535 979 1374
                                </a>
                                <a href="mailto:davutburakduundar@gmail.com" className="mx-3">
                                    <i class="fas fa-at"></i> davutburakduundar@gmail.com
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col sm={6} >
                        <div>
                            <Form className="mx-auto" onSubmit={this.contactForm} >
                                
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name *</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter is name" 
                                        id='contact_name'
                                        name='name'
                                        onChange={this.handleChange}
                                        value={this.state.name} 
                                        pattern={'[A-Za-z\s]{2,12}$'}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Email address *</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="name@example.com" 
                                        id="contact_mail" 
                                        name='email'
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                        pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Message *</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3} 
                                        id="contact_mail" 
                                        name='message'
                                        onChange={this.handleChange}
                                        value={this.state.message}
                                        pattern={'[A-Za-z0-9.%+-\s]{12,300}$'}
                                        minLength={12}
                                        maxLength={300}
                                        required
                                    />
                                </Form.Group>

                                <Button className='w-100' variant="outline-success" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Col>    
                </Row>    
            </div>
        )
    }
}

export default Contact;