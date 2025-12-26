import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { navigateTo } from "../../utils/navigation";

const publicApi = axios.create({
  baseURL: "http://127.0.0.1:3001/api"
});

const api = axios.create({
  baseURL: "http://127.0.0.1:3001/api"
});

// Add token automatically to every request
/* api.interceptors.request.use(
  (config) => {
    const userStorageData = JSON.parse(localStorage.getItem("user"));
    if(userStorageData){      
      if (userStorageData.token) {
        config.headers.Authorization = `Bearer ${userStorageData.token}`;
      }
      return config;
    }else{
      alert("Please login before add post.");
      navigateTo('/login');
      // () => Promise.reject('Please login before add post.');
      return Promise.reject({
        response: {
          status: 401,
          data: { msg: "Please login before adding post." }
        }
      });

    }
  },
  (error) => Promise.reject(error)
); */

/* api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) {
      if (data?.code === "TOKEN_EXPIRED") {
        alert("Session expired. Please login again.");
      } else if (data?.code === "TOKEN_INVALID") {
        alert("Invalid token. Please login again.");
      } else if (data?.code === "TOKEN_MISSING") {
        alert("Please login to continue.");
      }

      try {
        localStorage.removeItem("user");
        console.error("success remove");
        // SPA redirect (NO reload)
        // navigateTo("/login", {
        //   replace: true,
        //   state: { error: data?.msg }
        // });
        
      } catch (error) {
        console.error("LocalStorage remove error:", error);
      }
      
      
    }

    return Promise.reject(error);
  }
); */

api.interceptors.request.use(
  (config) => {
    const userStorageData = JSON.parse(localStorage.getItem("user"));

    if (userStorageData?.token) {
      config.headers.Authorization = `Bearer ${userStorageData.token}`;
    }

    return config; // ✅ ALWAYS return config
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status === 401) {
      alert(data?.msg || "Please login again.");
      localStorage.removeItem("user");
      navigateTo("/login")
    }

    return Promise.reject(error); // ✅ REQUIRED
  }
);

// add
export const addPost = async (data) => {
  try{
    const res = await api.post(`/post`, data);
    console.log("res 111:", res);
    return res.status === 200 ? res.data : [];
  } catch (error){
    console.log("post error: ",error);
    throw error;
  } 
}

// fetch.
export const fetchPosts = async (page) => {
  try{
    const res = await publicApi.get(`/post?page=${page}&limit=4`);
    // const res = await publicApi.get(`/post`);
    return res.status === 200 ? res.data : [];
  } catch (error){
    // console.log(error);
    return [];
  } 
  
};

// delet.
export const deletePost = async (id) => {
  try{
    const res = await api.delete(`/post/${id}`);
    console.log("res data 2222: ", res);
    return res.status === 200 ? res.data : [];
  } catch (error){
    console.log("API error", error);
    return [];
  } 
}

// get one post by id.
// fetch.
/* export const getPost = async (id) => {
  // console.log("id data: ", id);
  if(id==0) return [];
  try{
    const res = await publicApi.get(`/post/${id}`);
    console.log('res11: ', res);
    return res.status === 200 ? res.data.data : [];
  } catch (error){
    // console.log(error);
    return [];
  } 
  
}; */
export const getPost = async (id) => {
  if (!id) {
    throw new Error("Invalid post id");
  }

  const res = await publicApi.get(`/post/${id}`);

  if (res.status !== 200) {
    throw new Error("Failed to fetch post");
  }
  console.log('res11: ', res.data.data);
  return res.data.data; // ONLY actual post object
};


// update.
export const updatePost = async (id,form) => {
  console.log('post id: ',id);
  console.log('post data: ',form);

  try{
    const res = await api.put(`/post/${id}`, form);
    return res.status === 200 ? res.data : [];
  } catch (error){
    console.log(error);
    throw error;
  } 
}

