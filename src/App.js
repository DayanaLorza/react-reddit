import React, { useState } from "react";
import FrontPage from "./pages/FrontPage";
import { Container, Col, Row } from "reactstrap";
import { IoLogoReddit } from "react-icons/io";

import "./App.css";

function App() {
  const [subs, setSubs] = useState(0);

  const updateSubs = (num) => {
    setSubs(num);
  };

  return (
    <div className="reddit-container">
      <Container>
        <Row>
          <Col className="icons">
            <IoLogoReddit className="reddit-icon" /> {subs} following
          </Col>
        </Row>
        <Row>
          <Col>
            <FrontPage updateSubs={updateSubs} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
