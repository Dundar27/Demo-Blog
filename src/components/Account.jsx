import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="account-component">
        <div className="p-5">
          <Row>
            <Col sm={3}>
              <Card>
                <div className="text-center p-3">
                  <img
                    src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    className="avatar w-100"
                    alt="avatar"
                  />             
                  <h3 className="mt-3">User Name</h3> 
                </div>
                <div>
                  <ListGroup>
                    <ListGroup.Item className="ListGroup.Itemst-group-item text-muted">
                      Activity 
                    </ListGroup.Item>
                    <ListGroup.Item className="ListGroup.Itemst-group-item text-right">
                      Followers:
                      <span className="pull-left mx-2">
                        433
                      </span>
                      
                    </ListGroup.Item>
                    <ListGroup.Item className="ListGroup.Itemst-group-item text-right">
                      Posts:
                      <span className="pull-left mx-2">
                      231
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className="ListGroup.Itemst-group-item text-right">
                      Likes:
                      <span className="pull-left text-success mx-2">
                        3433
                      </span>
                      Dislikes:
                      <span className="pull-left text-danger mx-2">
                        3433
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item className="ListGroup.Itemst-group-item text-right">
                      average rating out of 10:
                      <span className="pull-left mx-2">
                       7.9
                      </span>      
                    </ListGroup.Item>
                  </ListGroup>
                </div>
                <div className="panel panel-default my-2 text-center">
                    <div className="panel-heading"><h6>Social Media</h6></div>
                    <div className="panel-body">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                        <a href="https://www.github.com/Davut27/" target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-github fa-2x"></i>
                        </a>
                        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                        <a href="https://www.instagram.com/davut_burak_/" target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                    </div>
                </div>
              </Card>
            </Col>

            <Col sm={9}>
              <ListGroup className="nav nav-tabs">
                  
                <ListGroup.Item className="active">
                  <Link data-toggle="tab" to="/account/profile">
                    Profile
                  </Link>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Link data-toggle="tab" to="/account/profileSettings">
                    Profile Settings
                  </Link>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Link data-toggle="tab" to="/account/accountSettings">
                    Account Settings
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Account;