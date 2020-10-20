import React, { useState } from "react";
import { Row, Col, Button, Form, Input } from "reactstrap";

const SubRedditInput = (props) => {
  const [subReddit, setSubReddit] = useState("");

  const handleChange = (e) => {
    let name = e.target.value;
    setSubReddit(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit({
      subReddit: subReddit,
    });

    setSubReddit("");
  };

  return (
    <>
      <Row>
        <Col>
          <Form className="reddit-form" onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              value={subReddit}
              onChange={handleChange}
              onSubmit={handleSubmit}
              className="reddit-input"
              placeholder="Search SubReddit...."
            />
            <Button className="reddit-button">Add SubReddit</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SubRedditInput;
