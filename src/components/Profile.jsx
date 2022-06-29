import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import db from './Firebase';
import { auth } from './Firebase';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import SearchBar from './SearchBar';

class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state= {
      userData: [],
      userBlogPosts: []
    }
  }

  componentDidMount(){
    this.getUserData();
    this.getUserBlogPosts();
  }

  async getUserData() {
    const response = await onSnapshot(query(collection(db, 'users'), where("id", "==", this.props.userControl.uid)), snapshop => this.setState({userData: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
  }

  async getUserBlogPosts() {
    const response = await onSnapshot(query(collection(db, 'blogs'), where("writer", "==", this.props.userControl.displayName)), snapshop => this.setState({userBlogPosts: snapshop.docs.map(doc => ({
      id:doc.id,data:doc.data()
    }))}));
  }

  render(){

  return (
    <div id="account-component">
      <div className="p-5">
        <Row>
        {this.state.userData.map(user =>(
          <Col sm={3}>
            <Card>
              <div className="text-center p-3">
                {(user.data.imgurl !== "" || null || undefined || NaN) ? 
                (<img
                  src={user.data.imgurl}
                  className="avatar w-100"
                  alt="avatar"
                />):(
                  <img
                  src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  className="avatar w-100"
                  alt="avatar"
                /> )}
                            
                <h3 className="mt-3">
                  {user.data.username}
                </h3>
              </div>
              <div>
                <ListGroup>

                  <ListGroup.Item className="ListGroup-Item text-muted text-center">
                    Profile 
                  </ListGroup.Item>

                    <div>
                      <ListGroup.Item className="ListGroup-Item">
                        <Row>
                          <Col sm={6}>
                            <span className="fw-bold">
                              First Name :
                            </span>
                          </Col>
                          <Col sm={6}>
                            <span className="text-center">
                              {user.data.firstname}
                            </span>  
                          </Col> 
                        </Row>               
                      </ListGroup.Item>

                      <ListGroup.Item className="ListGroup-Item">
                        <Row>
                          <Col sm={6}>
                            <span className="fw-bold">
                              Last Name :
                            </span>
                          </Col> 
                          <Col sm={6}>
                            <span className="text-center">
                              {user.data.lastname}
                            </span>
                          </Col> 
                        </Row> 
                      </ListGroup.Item>

                      <ListGroup.Item className="ListGroup-Item">                     
                        <Row>
                          <Col sm={6}>
                            <span className="fw-bold">
                              Age :
                            </span>
                          </Col> 
                          <Col sm={6}>
                            <span className="text-center">
                              {new Date().getFullYear()-(user.data.birthday)}
                            </span>
                          </Col> 
                        </Row> 
                      </ListGroup.Item>

                      <ListGroup.Item className="ListGroup-Item">
                        <Row>
                          <Col sm={6}>
                            <span className="fw-bold">
                              Adress :
                            </span>
                          </Col> 
                          <Col sm={6}>
                            <span className="text-center">
                              {user.data.adress}
                            </span>
                          </Col> 
                        </Row> 
                      </ListGroup.Item>

                      <ListGroup.Item className="ListGroup-Item">
                        <Row>
                          <Col sm={6}>
                            <span className="fw-bold">
                              Contact No :
                            </span>
                          </Col> 
                          <Col sm={6}>
                            <span className="text-center">
                              {user.data.phone}
                            </span>
                          </Col> 
                        </Row> 
                      </ListGroup.Item>

                      <ListGroup.Item className="ListGroup-Item">
                        <Row>
                          <Col sm={12}>
                            <span className="fw-bold">
                              Mail Adress :
                            </span>
                            <br />
                            <span className="text-center">
                              {auth.currentUser.email}
                            </span>
                          </Col> 
                        </Row> 
                      </ListGroup.Item>
                    </div>
                </ListGroup>
              </div> <br />

              <div className="panel panel-default my-2 text-center">
                  <div className="panel-heading"><h6>Social Media</h6></div>
                  <div className="panel-body">
                  {(user.data.facebookProfileURL !== "" || null)  ?
                        (<a href={user.data.facebookProfileURL} target="_blank" rel="noopener noreferrer" className="mx-2">
                          <i className="fab fa-facebook fa-2x"></i>
                        </a>):(
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                          <i className="fab fa-facebook fa-2x"></i>
                        </a>)
                      }
                      {(user.data.twitterProfileURL !== "" || null) ?
                        (<a href={user.data.twitterProfileURL} target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>):(
                        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                          <i className="fab fa-twitter fa-2x"></i>
                        </a>)
                      }
                      {(user.data.instagramProfileURL !== "" || null) ?  
                        (<a href={user.data.instagramProfileURL} target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>):(
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                          <i className="fab fa-instagram fa-2x"></i>
                        </a>)
                      }
                  </div>
              </div>
            </Card>
          </Col>
        ))}
          <Col sm={9}>
              <div>
                <h2>Abouth Me</h2> <br />
                <p>{this.state.userData.map(user =>(user.data.usermessage))}</p> <br />
              </div>
              <div>
                <h2>My Blog Posts</h2> <hr />

                <SearchBar searchProp={this.props.searchProp}/>

                {this.state.userBlogPosts.map((blog)=>(
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
                ))}
              </div>
          </Col>
        </Row>
      </div>
    </div>
  );
  }
}

export default Profile;