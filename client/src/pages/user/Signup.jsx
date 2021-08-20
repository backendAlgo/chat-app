import React, { useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    const user = {
      name,
      email,
      password,
    };
    // console.log(user);
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setEmail("");
        setName("");
        setPassword("");
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Signup</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
