import React, { useState } from "react";

const Signup = () => {
  const [signUpData, setSignUpData] = useState({
      name: "",
      email: "",
      password: "",
      cpassword: "",
  });

  const[apiMsg, setApiMsg] = useState();
  const[isApiError, setIsApiError] = useState(false);
  // collect form data.
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { name, value, type, checked, files } = e.target;

    // For input, textarea, select, radio
    setSignUpData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 // validation.
const validate = () =>{
  let err = {};
  if(!signUpData.name.trim()){
    err.name = "Name is required";
  } 
  if(!signUpData.email){
    err.country = "Email is required";
  }

  if(!signUpData.password){
    err.hobbies = "Password is required";
  }  
  return err;
}  

// Submit data.
const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) {
    console.log("Form has errors");
    return;
  }

  const formData = {
    name: signUpData.name,
    email: signUpData.email,
    password: signUpData.password
  };

  console.log("Form submitted");
  console.log(formData);

  const res = await fetch("http://127.0.0.1:3001/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),

  });

  // ✅ Check status code
  console.log("Status Code:", res.status);

  // ✅ Check success/failure
  /* if (!res.ok) {
    const errorData = await res.json();
    console.error("Error:", errorData);
    return;
  } */
  const data = await res.json();

  if(res.status == 201){
    setSignUpData({
      name: "",
      email: "",
      password: "",
      cpassword: "",
    });
    // setIsApiError(false);

  }else{
    setIsApiError(true);
  } 
  setApiMsg(data.msg);  

  console.log("API Response:", data);
};


  const apiMessage = (isApiError) ? 'text-danger' : 'text-success';
  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>

      <h3
          className={apiMessage}
          style={{
            width: "60%",
            background: "#d4e6f1",
            textAlign: "center",
          }}
        >
          {apiMsg}
      </h3>
      <h2>SignUp</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label><br />
          <input
            type="text"
            name="name"
            value={signUpData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label>Email</label><br />
          <input
            type="email"
            name="email"
            value={signUpData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Password</label><br />
          <input
            type="password"
            name="password"
            value={signUpData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Confirm Password</label><br />
          <input
            type="password"
            name="cpassword"
            value={signUpData.cpassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <br />

        <button type="submit">SignUp</button>
        
      </form>
      

    </div>
  );
};

export default Signup;
