import React from 'react';
import { Link } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { auth } from './Firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import db from './Firebase';
import { doc, setDoc, onSnapshot, collection } from "firebase/firestore";
import ToastComponent from "./ToastComponent";


class Register extends React.Component {

  constructor(props) {
    super(props);
    this.Register = this.Register.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      firstname: "",
      lastname: "",
      birthday: "",
      adress: "",
      phone: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      userNames: [],
      showA: false,
      showB: false,
      showC: false,
      showD: false,
      showE: false
    }
  }

  componentDidMount() {
    this.getUserNames();
  }

  async getUserNames() {
    const response = await onSnapshot(collection(db, 'usernames'), snapshop => this.setState({
      userNames: snapshop.docs.map(doc => ({
        data: doc.data()
      }))
    }));
  }

  toggleShowA = () => { this.state.showA ? this.setState({ showA: false }) : this.setState({ showA: true }); };

  toggleShowB = () => { this.state.showB ? this.setState({ showB: false }) : this.setState({ showB: true }); };

  toggleShowC = () => { this.state.showC ? this.setState({ showC: false }) : this.setState({ showC: true }); };

  toggleShowD = () => { this.state.showD ? this.setState({ showD: false }) : this.setState({ showD: true }); };

  toggleShowE = () => { this.state.showE ? this.setState({ showE: false }) : this.setState({ showE: true }); };

  async Register(e) {

    e.preventDefault();

    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const birthday = this.state.birthday;
    const adress = this.state.adress;
    const phone = this.state.phone;
    const username = this.state.username;
    const email = this.state.email;
    const password = this.state.password;
    const password2 = this.state.password2;
    const userNames = this.state.userNames.map(user => user.data.username);

    const successMessage = document.getElementById("registration_successful");
    const errorMessage = document.getElementById("registration_failed");

    const ToastA = () => this.toggleShowA();
    const ToastB = () => this.toggleShowB();
    const ToastC = () => this.toggleShowC();
    const ToastD = () => this.toggleShowD();
    const ToastE = () => this.toggleShowE();

    function validate() {

      let valid, valid1, valid2;

      if (userNames.indexOf(username) > -1) { valid1 = false; ToastA(); }
      else { valid1 = true; }

      if (password !== password2) { valid2 = false; ToastC(); }
      else { valid2 = true; }

      if (valid1 && valid2 === true) { valid = true }
      else { valid = false }

      return valid;
    }

    function createUser() {

      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {

        userCredential.user.displayName = username;
        userCredential.user.phoneNumber = phone;

        setDoc(doc(db, "users", auth.currentUser.uid), {

          username: username,
          firstname: firstname,
          lastname: lastname,
          birthday: birthday,
          adress: adress,
          phone: phone,
          id: auth.currentUser.uid,

          imgurl: "",
          facebookProfileURL: "",
          twitterProfileURL: "",
          instagramProfileURL: ""
        });

        setDoc(doc(db, "usernames", auth.currentUser.uid), {
          username: username
        })

        errorMessage.style.display = "none";
        successMessage.style.display = "block";

        sendEmailVerification(userCredential.user)
          .then(() => { ToastD(); })
          .catch(error => { ToastE(); });

        setTimeout(function() {
          window.location = "/verification/";
        }, 1000);

      }).catch((err) => {
        console.log(err);
        ToastB();
      });
    }

    if (validate().valueOf() === true) { createUser(); }
    else { errorMessage.style.display = "block"; }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <div className='p-3 mt-5  container' id='register-component'>
        <div>
          <h1 className='text-center mb-5'>Register Form</h1>
          <Form method="post" onSubmit={this.Register} className="mx-auto">

            <div className='d-flex'>
              <Form.Group className="mb-3 w-100" id="formBasicEmail">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  id='register_firstname'
                  name='firstname'
                  onChange={this.handleChange}
                  value={this.state.firstname}
                  pattern={'[A-Za-z]{2,12}$'}
                />
              </Form.Group>

              <Form.Group className="mb-3 w-100 mx-2" id="formBasicEmail">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  id='register_lastname'
                  name='lastname'
                  onChange={this.handleChange}
                  value={this.state.lastname}
                  pattern={'[A-Za-z]{2,12}$'}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3" id="formBasicEmail">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter date of birth"
                id='register_birthday'
                name='birthday'
                onChange={this.handleChange}
                value={this.state.birthday}
                pattern={'[0-9]{4}$'}
                minLength={4}
                maxLength={4}
              />
            </Form.Group>

            <div className='d-flex'>

              <Form.Group className="mb-3 w-100" id="formBasicEmail">
                <Form.Label>Current Adress</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Enter City Where You Live"
                  id='register_adress'
                  name='adress'
                  onChange={this.handleChange}
                  value={this.state.adress}
                  pattern={'[A-Za-z]{4,16}$'}
                />
              </Form.Group>

              <Form.Group className="mb-3 w-100 mx-2" id="formBasicEmail">
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter tel no"
                  id='register_tel'
                  name='phone'
                  onChange={this.handleChange}
                  value={this.state.phone}
                  pattern={'[0-9]{11}$'}
                />
              </Form.Group>
            </div>

            <div className="d-flex">
              <Form.Group className="mb-3 w-100" id="formBasicEmail">

                <Form.Label>User Name *</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  id="register_username"
                  name='username'
                  onChange={this.handleChange}
                  value={this.state.username}
                  pattern={'[a-zA-Z0-9._]{6,16}$'}
                  required
                />
                <span className='form-text'>*Username must consist of letters and numbers</span>
              </Form.Group>

              <Form.Group className="mb-3 w-100 mx-2" id="formBasicEmail">

                <Form.Label>Email address *</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  id="register_email"
                  name='email'
                  onChange={this.handleChange}
                  value={this.state.email}
                  pattern={'[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'}
                  required
                />
              </Form.Group>
            </div>

            <div className='d-flex'>
              <Form.Group className="mb-3 w-100" id="formBasicPassword1">

                <Form.Label>Password *</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="register_password"
                  name='password'
                  onChange={this.handleChange}
                  value={this.state.password}
                  minLength={8}
                  maxLength={16}
                  pattern={'[a-zA-Z0-9.-]{8,16}$'}
                  required
                />
                <span className='form-text'>*Must contain at least one uppercase letter, lowercase letter, and number.</span>
              </Form.Group>

              <Form.Group className="mb-3 w-100 mx-2" id="formBasicPassword2">
                <Form.Label>Confirm Password *</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id='register_password2'
                  name='password2'
                  onChange={this.handleChange}
                  value={this.state.password2}
                  minLength={8}
                  maxLength={16}
                  pattern={'[a-zA-Z0-9.-]{8,16}$'}
                  required
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3 d-flex" id="formBasicCheckbox">
              <Form.Check type="checkbox" required />
              <Form.Label>
                <Link to={"/policys"} className="mx-1">
                  Check me out have read the security and privacy terms
                </Link>
              </Form.Label>
            </Form.Group>

            <div className='d-flex'>
              <Button className='w-100' variant="outline-success" type="submit">
                Submit
              </Button>
              <Link to={"/login/"} className="w-100 btn btn-outline-primary">Login</Link>
            </div>
          </Form>
        </div>
        <div className='mt-3' id='registration_successful' style={{ display: "none" }}>
          <div className='alert alert-success' role={alert}>
            <h4 className='alert-heading'>Registration Successful!</h4>
            <p>You have successfuly registered. You are directed to the profile page.</p>
          </div>
        </div>
        <div className='mt-3' id='registration_failed' style={{ display: "none" }}>
          <div className='alert alert-danger' role={alert}>
            <h4 className='alert-heading'>Registration Failed!</h4>
            <p>Make sure you enter the correct values and meet the requriments.</p>
          </div>
        </div>
        <div className='mt-3'>
          <div className='alert alert-warning' role={alert}>
            <h4 className='alert-heading'>Warning!</h4>
            <p>
              Our site is still under development. You are now using the demo version.
              If you've dicovered a bug, please let us know.
            </p>
          </div>
        </div>
        <ToastComponent
          show={this.state.showA}
          toggleShow={this.toggleShowA}
          message={"This username is already in use. Please enter a different username."}
        />
        <ToastComponent
          show={this.state.showB}
          toggleShow={this.toggleShowB}
          message={"This mail adress is already in use. Please enter a different mail adress."}
        />
        <ToastComponent
          show={this.state.showC}
          toggleShow={this.toggleShowC}
          message={"Please make sure you enter the passwords correctly.."}
        />
        <ToastComponent
          show={this.state.showD}
          toggleShow={this.toggleShowD}
          message={"Email verification sent"}
        />
        <ToastComponent
          show={this.state.showE}
          toggleShow={this.toggleShowE}
          message={"Email verification not sent"}
        />
      </div>
    )
  }
}

export default Register;