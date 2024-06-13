import { useEffect, useState } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { formatDate } from "../utils/formatDate";
import axios from "axios";
import axiosInstance from "../api/axios";
import { server } from "../server";
import { useSelector } from "react-redux";

const CommentEditor = ({ docId }) => {
  const authUser = useSelector((state) => state.user.user);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  console.log("comment", comment);

  useEffect(() => {
    const getComment = async () => {
      await axios.get(`${server}/doc/get-doc/${docId}/comments`).then((res) => {
        setComments(res.data);
      });
    };
    getComment();
  }, [docId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axiosInstance.post(
      `${server}/doc/get-doc/${docId}/comments`,
      {
        comment,
      }
    );
    const newComment = {
      comment: data.newComment.comment,
      createdAt: data.newComment.createdAt,
      userReviewId: {
        avatar: authUser.avatar,
        name: authUser.name,
      },
    };
    setComments((prevComments) => [...prevComments, newComment]);
    setComment("");
  };

  return (
    <StyleComment>
      <textarea
        id="subject"
        name="subject"
        value={comment}
        placeholder="Viết bình luận,..."
        style={{ height: "100px", width: "95%" }}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button className="send-comment" onClick={handleSubmit}>
        Gửi bình luận
      </button>
      <section className="session-comments">
        <h3>Bình luận</h3>
        <div className="list-review">
          {comments.map((comment, index) => (
            <div className="comment" key={index}>
              <div className="comment-header">
                <img
                  src={comment.userReviewId.avatar}
                  alt="Profile Picture"
                  className="profile-picture"
                />
                <div>
                  <span className="author-name">
                    {comment.userReviewId.name}
                  </span>
                  <div className="comment-rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="comment-time">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="comment-body">{comment.comment}</div>
            </div>
          ))}
        </div>
        <div className="view-more-review">view more</div>
        {/* render comments  */}
      </section>
    </StyleComment>
  );
};

export default CommentEditor;
const StyleComment = styled.div`
  .demo-wrapper {
    width: 95%;
  }
  .demo-editor {
    padding: 0 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-top: none;
    height: 140px;
    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #ccc;
    }

    &::-webkit-scrollbar-thumb {
      background: #12ab7f;
      border-radius: 10px;
    }
  }

  .send-comment {
    border: none;
    padding: 10px 20px;
    background-color: #59efb2;
    box-shadow: 4px 4px 4px rgba(29, 247, 158, 0.2),
      4px 4px 4px rgba(29, 247, 158, 0.2);
    margin: 20px 42px;
    color: white;
    border-radius: 3px;
    float: right;
    &:hover {
      cursor: pointer;
    }
  }
  .session-comments {
    margin-top: 100px;
  }
  .list-review {
    .comment:nth-last-child(1) {
      border-bottom: none;
    }
  }
  .comment {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }

  .comment-header {
    display: flex;
    margin-bottom: 10px;
  }

  .profile-picture {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }

  .author-name {
    font-weight: bold;
  }

  .comment-rating {
    display: flex;
    align-items: center;
  }

  .star {
    color: gold;
  }

  .comment-time {
    margin-left: 5px;
    color: #888;
  }

  .comment-body {
    line-height: 1.4;
  }
  .view-more-review {
    margin: auto;
    font-weight: 600;
    border-bottom: 1px solid blue;
    width: 73px;
    text-align: center;
  }
`;
