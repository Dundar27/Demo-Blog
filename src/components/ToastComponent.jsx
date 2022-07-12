import React from "react";
import { Toast } from "react-bootstrap";

const ToastComponent = (props) => {
    
    return(
        <Toast show={props.show} onClose={props.toggleShow} className="toast" id="toast">
            <Toast.Header>
                <i className="fas fa-at"></i>
                <strong className="me-auto mx-1">Demo Blog Page</strong>
                <small>0 mins ago</small>
            </Toast.Header>
            <Toast.Body className="mx-2 text-danger">{props.message}</Toast.Body>
        </Toast>
    );
}

export default ToastComponent;