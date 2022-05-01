import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup } from "react-bootstrap";

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
              <div className="text-center">
                <img
                  src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  className="avatar img-circle img-thumbnail"
                  alt="avatar"
                />
                <h3 className="my-2">{"User Name"}</h3>
                
                <div className="panel panel-default mt-3">
                    <div className="panel-heading"><h6>Social Media</h6></div>
                    <div className="panel-body">
                        <a href={"https://www.instagram.com/davut_burak_/"} target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                        <a href={"https://www.instagram.com/davut_burak_/"} target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-github fa-2x"></i>
                        </a>
                        <a href={"https://www.instagram.com/davut_burak_/"} target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                        <a href={"https://www.instagram.com/davut_burak_/"} target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-pinterest fa-2x"></i>
                        </a>
                        <a href={"https://www.instagram.com/davut_burak_/"} target="_blank" rel="noopener noreferrer" className="mx-2">
                            <i className="fab fa-google-plus fa-2x"></i>
                        </a>
                    </div>
                </div> 
              </div>
              <br /><hr />

              <ListGroup>
                <ListGroup.Item className="ListGroup.Itemst-group-item text-muted">
                  Activity 
                </ListGroup.Item>
                <ListGroup.Item className="ListGroup.Itemst-group-item text-right">
                  <span className="pull-left mx-2">
                    <strong>Followers:</strong>
                  </span>
                  433
                </ListGroup.Item>
                <ListGroup.Item className="ListGroup.Itemst-group-item text-right">
                  <span className="pull-left mx-2">
                    <strong>Posts:</strong>
                  </span>
                 231
                </ListGroup.Item>
                <ListGroup.Item className="ListGroup.Itemst-group-item text-right">
                  <span className="pull-left mx-2">
                    <strong>Likes:</strong>
                  </span>
                  3433
                </ListGroup.Item>
              </ListGroup>
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
