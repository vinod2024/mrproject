import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LoginForm = () => {

  const { state } = useLocation();

  const navigate = useNavigate();
  const { login } = useAuth();

  const [apiMsg, setApiMsg] = useState();
  const [isApiError, setIsApiError] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

   // validation.
  const validate = () =>{
    let err = {};
    if(!form.email){
      err.email = "Email is required";
    }

    if(!form.password){
      err.password = "Password is required";
    }  
    return err;
  }  

  // Submit login form.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      console.log("Form has errors");
      return;
    }

    const formData = {
      email: form.email,
      password: form.password
    };

    console.log("Form submitted");
    console.log(formData);

    const res = await fetch("http://127.0.0.1:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),

    });

  const data = await res.json();
  if(res.status == 200){
    setForm({
      email: "",
      password: "",
    });

    console.log('res data', data);
    login(data);
    navigate("/profile");

  }else{
    setIsApiError(true);
    setApiMsg(data.msg); 
  } 
   

  console.log("API Response:", data);
};

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Login</h2>

      {state?.success && (
        <div className="alert alert-success">
          {state.success}
        </div>
      )}

      {isApiError && apiMsg && (
        <div className="alert alert-danger">
          {apiMsg}
        </div>
      )}

      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label><br />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">Login</button>
        
      </form>

      <NavLink to="/sign-up">SignUp</NavLink>
    </div>
  );
};

export default LoginForm;
