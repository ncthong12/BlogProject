import React, { useContext, useEffect, useState } from "react";
import "./details.css";
import "../../components/header/header.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { Context } from "../../context/Context";

export const DetailsPages = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  // step 4 for update
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [update, setUpdate] = useState(false);

  //setp 2
  const [post, setPost] = useState({});
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/api/posts/" + path);
      //setp 2
      setPost(res.data);
      //setp 4
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  // step 3
  // file create garne time add garne
  const { user } = useContext(Context);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (error) {}
  };

  // setp 4
  const handleUpdate = async () => {
    try {
      await axios.put(`/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="singlePage">
        <div className="container">
          <div className="left">
            {post.photo && <img src={post.photo} alt="" />}
          </div>
          <div className="right">
            {user ? (
              post.username === user.username && (
                <div className="buttons">
                  <button className="button" onClick={() => setUpdate(true)}>
                    <BsPencilSquare />
                  </button>
                  <button className="button" onClick={handleDelete}>
                    <AiOutlineDelete />
                  </button>
                  {update && (
                    <button className="button" onClick={handleUpdate}>
                      Update
                    </button>
                  )}
                </div>
              )
            ) : (
              <></>
            )}

            {update && user ? (
              <input
                type="text"
                value={title}
                className="updateInput"
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h1>{post.title}</h1>
            )}
            {update && user ? (
              <textarea
                value={desc}
                cols="30"
                rows="10"
                className="updateInput"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            ) : (
              <p>{post.desc}</p>
            )}

            <p>
              Author:{" "}
              <Link to={`/?user=${post.username}`}>{post.username}</Link>
            </p>
            <p>Publish: {new Date(post.createdAt).toDateString()}</p>
          </div>
        </div>
      </section>
    </>
  );
};
