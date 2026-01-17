import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "./AuthContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
  const token = new URLSearchParams(window.location.search).get("token");

  if (!token) {
    navigate("/login");
    return;
  }
  
  const fetchUserProfile = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3001/api/profile-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Unauthorized");
      }
      const data = await res.json();
      // Save token + user in auth context / redux
      login({
        token,
        data: data.data
      });

      navigate("/profile");
    } catch (error) {
      console.error("Auth error:", error);
      navigate("/login");
    }
  };

  fetchUserProfile();
}, []);

};

export default OAuthSuccess;
