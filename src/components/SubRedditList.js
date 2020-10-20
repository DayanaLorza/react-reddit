import React from "react";
import { TiDelete } from "react-icons/ti";
import { BiUpvote } from "react-icons/bi";

const SubRedditList = ({ userSubReddits, removeSub }) => {
  return userSubReddits
    ? userSubReddits
        .sort((a, b) => (a.score < b.score ? 1 : -1))
        .map((post, i) => (
          <>
            <div key={post.id} className="reddit-row">
              <div className="icons-upvote">
                <p>
                  {" "}
                  <BiUpvote className="upvote-icon" />
                  {post.score}
                </p>
                r/{post.subreddit}
              </div>
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                {post.title}
              </a>
              <div className="icons">
                <TiDelete
                  onClick={() => removeSub(post.id)}
                  className="delete-icon"
                />
              </div>
            </div>
          </>
        ))
    : null;
};

export default SubRedditList;
