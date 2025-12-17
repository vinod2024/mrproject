import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";


const Profile = () => {

  // document.title = "MyApp Title";
  const { user, login } = useAuth();
  
  const [count, setCount] = useState(0);
  const [errors, setErrors] = useState({});
  const [signUpData, setSignUpData] = useState({
      name:'',
      age:'',
      profile_image:'',
  });
  
  const userProfileData = async() =>{
    const url = 'http://127.0.0.1:3001/api/profile-data';
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearrer ${user.token}`
      },
      // body: '',
    });

    const userDetails = await res.json();
    const {name, age, profile_image} = userDetails.data;
    const userProfile = {
        name,
        age,
        profile_image,
    };
    setSignUpData(userProfile);

    const updatedResponse = {
      ...user,
      data: {
        ...user.data,
        ...userProfile
      }
    };
    login(updatedResponse);

  }

  useEffect( ()=>{
    userProfileData(); 
  },[count]);
  

  const[apiMsg, setApiMsg] = useState();
  const[isApiError, setIsApiError] = useState(false);
  // collect form data.

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    const { name, value, type, checked, files } = e.target;

    // -----------------------
    //  File input (single)
    // -----------------------
    if (type === "file" && files.length === 1) {
      const file = e.target.files[0];
      // console.log(file);
      
      setSignUpData((prev) => ({
        ...prev,
        [name]: file   // store File object
      }));
      return;
    }
    // For input, textarea, select, radio
    setSignUpData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 // validation.
const allowedTypes = ['image/png', 'image/jpeg'];
const validate = () =>{
  // console.log("signUpData", signUpData);
  let err = {};
  if(!signUpData.name.trim()){
    err.name = "Name is required";
  } 
  if(!signUpData.age){
    err.age = "Age is required";
  }
  if (signUpData.profileimage?.name && !allowedTypes.includes(signUpData.profileimage.type) ) {
    err.profileimage = "Only PNG or JPEG images are allowed";
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

  // ✅ Use FormData
  const formData = new FormData();
  formData.append("name", signUpData.name);
  formData.append("age", signUpData.age);
  formData.append("profileimage", signUpData.profileimage);

  console.log("Form submitted");
  console.log(formData);

  const res = await fetch("http://127.0.0.1:3001/api/profile-update", {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      // "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
      "Authorization": `Bearrer ${user.token}`
    },
    // body: JSON.stringify(formData),
    body: formData,
  });

  // ✅ Check status code
  console.log("Status Code:", res.status);

  // ✅ Check success/failure
  const data = await res.json();

  if(res.status == 200){
    setCount(count+1);
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
      <h2>My Profile</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label><br />
          <input
            type="text"
            name="name"
            value={signUpData.name}
            onChange={handleInputChange} 
          />{errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <br />
        <div>
          <label>Age</label><br />
          <input
            type="number"
            name="age"
            value={signUpData.age}
            onChange={handleInputChange}
          />
          {errors.age && <p style={{ color: "red" }}>{errors.age}</p>}
        </div>

        <br />

        <div>
          <label>Profile Image</label><br />
          <input
            type="file"
            name="profileimage"
            // value={signUpData.profile_image}
            onChange={handleInputChange}
          />
          {errors.profileimage && <p style={{ color: "red" }}>{errors.profileimage}</p>}
          <img src={`http://127.0.0.1:3001/images/${signUpData.profile_image}`} alt="" width="100" />
        </div>

        <br />

        <br />

        <button type="submit">SignUp</button>
        
      </form>
      

    </div>
  );
};

export default Profile;
