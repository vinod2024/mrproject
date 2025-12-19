import React from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://www.omdbapi.com/"
});

// creae a get function.
export const getMovie = () => {
  return api.get("?i=tt3896198&apikey=773a882a&type=movie&s=titanic&page=1");
}


