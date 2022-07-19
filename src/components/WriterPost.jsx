import React from 'react';
import { Link } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";

const WriterPosts = (props) => {

  return (
    <Row>
      {props.WriterPosts.map((writer) => (
        <Col sm={6} >
          <Card className='my-4 mx-3'>
            <Card.Header className='text-center p-3'>
              <Card.Title className='w-100'>
                {writer.data.title}
              </Card.Title>
            </Card.Header>

            <Card.Body className="conteiner">
              <Card.Img src={writer.data.imgurl} className="d-block w-100" alt="Writer image_" />


            </Card.Body>

            <Card.Footer className='mt-2'>
              <Link to={'profile/' + writer.id} className="btn btn-outline-primary btn-rounded">Go to profile</Link>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default WriterPosts;