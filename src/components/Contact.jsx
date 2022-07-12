import React from "react";
import { Form, Button, Row, Col, Figure, Toast } from "react-bootstrap";
import emailjs from "emailjs-com";

class Contact extends React.Component{

    constructor(props){
        super(props);
        this.contactForm = this.contactForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state={
            from_name:"",
            from_mail:"",
            message:"",
            showA: false
        }
    }

    toggleShowA = () => {
        if(this.state.showA){
            this.setState({showA : false})
        }else{
            this.setState({showA : true})
        }
    };

    clearFields(){
        const name = document.getElementById("contact_name").value = "";
        const email = document.getElementById("contact_mail").value = "";
        const message = document.getElementById("contact_message").value = "";
    }

    contactForm = async(e) => {
        e.preventDefault();

        emailjs.sendForm('service_0zoh8i9', 'template_o5sjyyg', Form.current, 'cWuHlCDD3vOdezCYv')
        .then(() => {
            this.clearFields();
            this.toggleShowA();
        }, (error) => {
            console.log(error.text);
        });

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
                            <Form className="mx-auto" ref={Form} onSubmit={this.contactForm} >
                                
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name *</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter is name" 
                                        id='contact_name'
                                        name='from_name'
                                        onChange={this.handleChange}
                                        value={this.state.from_name} 
                                        pattern={'[A-Za-z]{2,12}$'}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Email address *</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="name@example.com" 
                                        id="contact_mail" 
                                        name='from_mail'
                                        onChange={this.handleChange}
                                        value={this.state.from_mail}
                                        pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Message *</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={3} 
                                        id="contact_message" 
                                        name='message'
                                        onChange={this.handleChange}
                                        value={this.state.message}
                                        pattern={'[A-Za-z0-9.%+-]{12,300}$'}
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
                <Toast show={this.state.showA} onClose={this.toggleShowA} className="toast" id="toast">
                    <Toast.Header>
                        <i className="fas fa-at"></i>
                        <strong className="me-auto mx-1">Demo Blog Page</strong>
                        <small>0 mins ago</small>
                    </Toast.Header>
                    <Toast.Body className="mx-2 text-success">Successfuly</Toast.Body>
                </Toast>    
            </div>
        )
    }
}

export default Contact;