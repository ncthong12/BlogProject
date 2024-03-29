import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./account.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";
import { expiration, key } from "../../assets/data/data";

export const Account = () => {
  const { user, dispatch } = useContext(Context);

  // same from create file
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [succ, setSucc] = useState(false);
  const handleDelete = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Do you want to delete your account?") == true) {
      try {
        const res = await axios.delete("/api/users/" + user._id, {
          data: {
            userId: user._id,
          },
        });
      } catch (error) {
        dispatch({ type: "UPDATE_FAILED" });
      }
      dispatch({ type: "LOGOUT" });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updateUser = {
      userId: user._id,
      username: username || user.username,
      email: email || user.email,
      password: password || user.password,
    };

    if (file) {
      const data = new FormData();

      const filename = Date.now() + "-" + file.name;
      data.append("name", filename);
      data.append("image", file);

      const res = await axios.post("https://api.imgbb.com/1/upload", data, {
        params: {
          expiration,
          key,
        },
      });
      updateUser.profilePic = res.data.data.url;
    }
    try {
      const res = await axios.put("/api/users/" + user._id, updateUser);
      setSucc(true);
      updateUser.password !== user.password
        ? dispatch({ type: "LOGOUT" })
        : dispatch({ type: "UPDATE_SUCC", payload: res.data });

      // window.location.reload()
    } catch (error) {
      dispatch({ type: "UPDATE_FAILED" });
    }
  };
  return (
    <>
      {user ? (
        <section className="accountInfo">
          <div className="container boxItems">
            <h1>Account Information</h1>
            <div className="content">
              <div className="left">
                <div className="img flexCenter">
                  <img
                    src={file ? URL.createObjectURL(file) : user.profilePic}
                    alt=""
                  />
                  <label htmlFor="inputfile">
                    <IoIosAddCircleOutline className="icon" />
                  </label>
                  <input
                    type="file"
                    id="inputfile"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
              <form className="right" onSubmit={handleSubmit}>
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="twoButton">
                <button className="button" type="submit">
                  Update
                </button>
                <button className="button" type="button" onClick={handleDelete}>
                  Delete
                </button>
                </div>
                {succ && <span>Profile is Updated</span>}
              </form>
            </div>
          </div>
        </section>
      ) : (
        window.location.replace("/")
      )}
    </>
  );
};
