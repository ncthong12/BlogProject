import React, { useEffect } from "react";
import "./create.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import { expiration, key } from "../../assets/data/data";

export const Create = () => {
  const [cats, setCat] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const getCat = async () => {
      const res = await axios.get("/api/category" + search);
      setCat(res.data);
    };
    getCat();
  }, [search]);
  const handleChange = (event, value) => setSelectedOptions(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc,
      categories: selectedOptions,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("image", file);

      try {
        const res = await axios.post("https://api.imgbb.com/1/upload", data, {
          params: {
            expiration,
            key,
          },
        });
        newPost.photo = res.data.data.url;
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post("/api/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };

  return (
    <>
      {user ? (
        <section className="newPost">
          <div className="container boxItems">
            <div className="img ">
              {file && <img src={URL.createObjectURL(file)} alt="images" />}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="inputfile flexCenter">
                <label htmlFor="inputfile">
                  <IoIosAddCircleOutline />
                </label>
                <input
                  type="file"
                  id="inputfile"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
              <Autocomplete
                multiple
                options={cats.map((a) => a.category)}
                getOptionLabel={(option) => option}
                // defaultValue={[category[0], top100Films[4]]}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <button className="button">Create Post</button>
            </form>
          </div>
        </section>
      ) : (
        window.location.replace("/")
      )}
    </>
  );
};
