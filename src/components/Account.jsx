import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Form, Button } from "react-bootstrap";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="account-component">
        <div className="container bootstrap snippet p-3">
          <Row>
            <Col sm={10}>
              <h1>User name</h1>
            </Col>
            <Col sm={2}>
              <Link to="/users" className="pull-right">
                <img
                  title="profile image"
                  className="img-circle img-responsive"
                  src="http://www.gravatar.com/avatar/28fd20ccec6865e2d5f0e1f4446eb7bf?s=100"
                  alt="Not found"
                />
              </Link>
            </Col>
          </Row>

          <Row>
            <Col sm={3}>
              <div className="text-center">
                <img
                  src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  className="avatar img-circle img-thumbnail"
                  alt="avatar"
                />
                <h6>Upload a different photo...</h6>
                <Form.Control
                  type="file"
                  className="text-center center-block file-upload"
                />
              </div>
              <hr />
              <br />

              <div className="panel panel-default">
                <div className="panel-heading">
                  Website <i className="fa fa-ListGroup.Itemnk fa-1x"></i>
                </div>
                <div className="panel-body">
                  <a href="http://bootnipets.com">bootnipets.com</a>
                </div>
              </div>

              <ListGroup>
                <ListGroup.Item className="ListGroup.Itemst-group-item text-muted">
                  Activity <i className="fa fa-dashboard fa-1x"></i>
                </ListGroup.Item>
                <ListGroup.Item className="ListGroup.Itemst-group-item text-right">
                  <span className="pull-left">
                    <strong>Shares</strong>
                  </span>{" "}
                  125
                </ListGroup.Item>
                <ListGroup.Item className="ListGroup.Itemst-group-item text-right">
                  <span className="pull-left">
                    <strong>ListGroup.Itemkes</strong>
                  </span>{" "}
                  13
                </ListGroup.Item>
                <ListGroup.Item className="ListGroup.Itemst-group-item text-right">
                  <span className="pull-left">
                    <strong>Posts</strong>
                  </span>{" "}
                  37
                </ListGroup.Item>
                <ListGroup.Item className="ListGroup.Itemst-group-item text-right">
                  <span className="pull-left">
                    <strong>Followers</strong>
                  </span>{" "}
                  78
                </ListGroup.Item>
              </ListGroup>

              <div className="panel panel-default">
                <div className="panel-heading">Social Media</div>
                <div className="panel-body">
                  <i className="fa fa-facebook fa-2x"></i>{" "}
                  <i className="fa fa-github fa-2x"></i>{" "}
                  <i className="fa fa-twitter fa-2x"></i>{" "}
                  <i className="fa fa-pinterest fa-2x"></i>{" "}
                  <i className="fa fa-google-plus fa-2x"></i>
                </div>
              </div>
            </Col>

            <Col sm={9}>
              <ListGroup className="nav nav-tabs">
                <ListGroup.Item className="active">
                  <Link data-toggle="tab" to="#home">
                    Home
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link data-toggle="tab" to="#messages">
                    Menu 1
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link data-toggle="tab" to="#settings">
                    Menu 2
                  </Link>
                </ListGroup.Item>
              </ListGroup>

              <div className="tab-content">
                <div className="tab-pane active" id="home">
                  <hr />

                  <Form
                    className="form"
                    action="##"
                    method="post"
                    id="registrationForm"
                  >
                    <Form.Group>
                      <Col sm={6}>
                        <Form.Label for="first_name">
                          <h4>First name</h4>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="first_name"
                          id="first_name"
                          placeholder="first name"
                          title="enter your first name if any."
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>
                      <Col sm={6}>
                        <Form.Label for="last_name">
                          <h4>Last name</h4>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="last_name"
                          id="last_name"
                          placeholder="last name"
                          title="enter your last name if any."
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>
                      <Col sm={6}>
                        <Form.Label for="phone">
                          <h4>Phone</h4>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="phone"
                          id="phone"
                          placeholder="enter phone"
                          title="enter your phone number if any."
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>
                      <Col sm={6}>
                        <Form.Label for="mobile">
                          <h4>Mobile</h4>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          className="form-control"
                          name="mobile"
                          id="mobile"
                          placeholder="enter mobile number"
                          title="enter your mobile number if any."
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>
                      <Col sm={6}>
                        <Form.Label for="email">
                          <h4>Email</h4>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="you@email.com"
                          title="enter your email."
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>
                      <Col sm={6}>
                        <Form.Label for="email">
                          <h4>Location</h4>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          className="form-control"
                          id="location"
                          placeholder="somewhere"
                          title="enter a location"
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>
                      <Col sm={6}>
                        <Form.Label for="password">
                          <h4>Password</h4>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="password"
                          title="enter your password."
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>
                      <Col sm={6}>
                        <Form.Label for="password2">
                          <h4>Verify</h4>
                        </Form.Label>
                        <Form.Control
                          type="password"
                          className="form-control"
                          name="password2"
                          id="password2"
                          placeholder="password2"
                          title="enter your password2."
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group>
                      <Col sm={6}>
                        <br />
                        <Button
                          variant="success"
                          className="btn btn-lg "
                          type="submit"
                        >
                          <i className="glyphicon glyphicon-ok-sign"></i> Save
                        </Button>
                        <Button
                          variant="danger"
                          className="btn btn-lg"
                          type="reset"
                        >
                          <i className="glyphicon glyphicon-repeat"></i> Reset
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                  <hr />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Account;
