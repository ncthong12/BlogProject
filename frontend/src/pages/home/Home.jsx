import React, { useEffect, useState } from "react";
import { Card } from "../../components/blog/Card";
import { Category } from "../../components/category/Category";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [cats, setCat] = useState([]);

  // setp 2
  const { search } = useLocation();
  // const location = useLocation()

  useEffect(() => {
    console.log("post call");
    const fetchPost = async () => {
      const res = await axios.get("/api/posts" + search);
      setPosts(res.data);
    };
    fetchPost();
  }, [search]);
  useEffect(() => {
    console.log("category call");
    const getCat = async () => {
      const res = await axios.get("/api/category" + search);
      setCat(res.data);
    };
    getCat();
  }, []);
  return (
    <>
      {console.log("render")}
      <Category cats={cats} />
      <Card posts={posts} />
    </>
  );
};
