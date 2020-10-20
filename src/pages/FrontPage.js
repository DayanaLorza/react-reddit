import React, { useState, useEffect } from "react";
import SubRedditList from "../components/SubRedditList";
import { Container, Row, Col } from "reactstrap";
import SubRedditInput from "../components/SubRedditInput";

const FrontPage = ({ updateSubs }) => {
  const [userSubReddits, setUserSubReddits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch(`https://www.reddit.com/r/cyberpunk.json`).then((res) => {
    //   if (res.status !== 200) {
    //     console.log("Error");
    //     return;
    //   }
    //   res.json().then((data) => {
    //     if (data) {
    //       const allSubreddits = [data.data.children[1].data, ...userSubReddits];
    //       setUserSubReddits(allSubreddits);
    //     }
    //   });
    // });
  }, []);

  const addSubReddit = (sub) => {
    // Add to existing array of subs
    if (!sub || /^\|s*$/.test(sub.subReddit)) {
      return;
    }
    setLoading(true);

    fetch(`https://www.reddit.com/r/${sub.subReddit}/top.json`).then((res) => {
      if (res.status !== 200) {
        setLoading(false);
        alert("something went wrong....");
        return;
      }
      res.json().then((data) => {
        // Handling edge cases where children didn't exists
        if (data.data.children[1] === undefined) {
          alert("something went wrong....");
          return;
        }
        if (data) {
          const allSubreddits = [data.data.children[1].data, ...userSubReddits];
          const arrLength = allSubreddits.length;

          // keep track of the subs that user is following
          // max subs = 10
          if (arrLength <= 10) {
            setUserSubReddits(allSubreddits);

            //Update Follow count on App page
            handleSubChange(arrLength);
          } else {
            // else remove last item in array
            const removedLast = allSubreddits.slice(0, -1);
            setUserSubReddits(removedLast);
          }
        } else {
          alert("something went wrong....");
          return;
        }
      });
      setLoading(false);
    });
  };

  const handleSubChange = (num) => {
    updateSubs(num);
  };

  const removeSub = (id) => {
    // Remove a sub
    const updatedSubs = [...userSubReddits].filter((r) => r.id !== id);
    setUserSubReddits(updatedSubs);

    handleSubChange(updatedSubs.length);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <SubRedditInput onSubmit={addSubReddit} />
          </Col>
        </Row>
        <Row>
          {loading ? (
            <Col>
              <div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </Col>
          ) : null}
        </Row>
        <Row>
          <Col>
            {userSubReddits ? (
              <SubRedditList
                userSubReddits={userSubReddits}
                removeSub={removeSub}
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FrontPage;
