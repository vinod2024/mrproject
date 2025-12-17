import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const MailVarification = () => {
  const { randomToken } = useParams();
  const [apiMsg, setApiMsg] = useState();
  const navigate = useNavigate();
  // console.log('state: ', randomToken);
  
  const verifyUser = async ()=>{
    const verifyUrl = "http://127.0.0.1:3001/mail-varification?token="+randomToken;  
    console.log('verifyUrl: ', verifyUrl);


    // return false;
    // console.log('randomToken: ', randomToken);

    const res = await fetch(verifyUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      // body: '',

    });
    const data = await res.json();

    console.log("Status Code:", data);

     if(res.status == 200){
      navigate("/login");
    } else {
      console.log("data.messsage: ", data.message);
      setApiMsg(data.message); 
    }
    
  }
 return (<>
        <h3>{apiMsg}</h3>
        <button onClick={verifyUser}>Varification</button>
  </>);
}
