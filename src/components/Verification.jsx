import React, { useState } from "react";
import { auth } from './Firebase';
import { sendEmailVerification } from 'firebase/auth';
import ToastComponent from "./ToastComponent";

const Verification = (props) => {

  const [showF, setShowF] = useState(false);
  const toggleShowF = () => setShowF(!showF);

  const logout = (event) => {
    event.preventDefault();
    auth.signOut();
  }

  const emailVerification = (event) => {
    event.preventDefault();
    if (auth.currentUser.emailVerified) { window.location = '/profile/' }
    else { toggleShowF(); sendEmailVerification(auth.currentUser); }
  }

  return (
    <div className="container my-5 mx-auto w-50" id="verification-component">
      <div className="text-center p-3">
        <h4>Verify your email address to continue.</h4>
        <span className="form-text text-warning">
          Please refresh the page once after verifying your email, then continue.
        </span>
        <br />
        <div className="mt-3">
          <form onSubmit={emailVerification}>
            <input
              className="form-control me-2 btn btn-outline-success"
              type="submit" value="Verify"
            />
          </form>
          <br />
          <form onSubmit={logout}>
            <input
              className="form-control me-2 btn btn-outline-danger"
              type="submit" value="Logout"
            />
          </form>
        </div>
      </div>
      <ToastComponent
        show={showF}
        toggleShow={toggleShowF}
        message={"First, verify your email address."}
      />
    </div>
  );
}

export default Verification;