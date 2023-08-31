import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import UserMenu from "../components/layout/UserMenu";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
function Profile() {
  const [auth, setAuth] = useAuth();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");

  //get user data

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setname(name);
    setemail(email);
    setphone(phone);
    setaddress(address);
  }, [auth?.user]);

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "http://localhost:8000/api/v1/auth/profile",
        {
          name,
          email,
          password,
          phone,
          address,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("auth")).token,
          },
        }
      );
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className=" form-container col-md-9">
            <form onSubmit={handleSubmit}>
              <h1 className="title">USER PROFILE</h1>
              <div class="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter  Your Email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  disabled
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Your Password "
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Phone Number"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  placeholder="Enter Your Addres "
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
