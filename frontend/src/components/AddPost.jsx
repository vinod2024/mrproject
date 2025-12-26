import { useEffect, useState, useRef } from "react";
import { updatePost, addPost, getPost } from "../api/PostsApi";
import { keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { navigateTo } from "../../utils/navigation";
import { useParams } from "react-router-dom";

// add
const AddPost = () => {
  const [form, setForm] = useState({title: "", body: "", });
  const { postId, page } = useParams();
  /* console.log("postId: ", postId);
  console.log("page no: ", page); */
  const queryClient = useQueryClient();
  const isInitialized = useRef(false);

  // get data first based on post id
  const { data, isSuccess, isPending, isError, error } = useQuery({
    queryKey: ["postdata", postId], // useState
    queryFn: ({ queryKey: [, id] }) => getPost(id),
    enabled: !!postId,
    /* isSuccess: (data) => {
      setForm({
        title: data.title,
        body: data.body,
      });
    }, */
  });

  useEffect(() => {
    if (!data) return;
    setForm({
      title: data?.title || "",
      body: data?.body || "",
    });
  }, [data]);  
  
  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post added successfully.");
      // navigateTo("/posts", );
    },

    onError: (error) => {
      alert(error.response?.data?.msg || "Failed to add post");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, form }) => updatePost(id,form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post update successfully.");
      navigateTo(`/posts/${page}`, );
    },
    onError: (error) => {
      alert(error.response?.data?.msg || "Failed to add post");
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate(form);
  };

  // updateSubmit
  const updateSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({id:postId, form});
  };

  const mutationType = postId?updateMutation:addMutation;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">{postId?"Update Post":"Add New Post"}</h2>

      {mutationType.isError && (
        <div className="mb-4 text-red-600 bg-red-100 p-2 rounded">
          {mutationType.isError}
        </div>
      )}

      <form onSubmit={postId?updateSubmit:handleSubmit} className="form-group col-md-6 p-4">
        <input
          type="text"
          name="title"
          placeholder="Post title"
          value={form?.title}
          onChange={handleChange}
          className="form-control w-full border p-2 rounded"
        />

        <textarea
          name="body"
          placeholder="Post body"
          value={form.body}
          onChange={handleChange}
          className=" form-control w-full border p-2 rounded"
          rows="4"
        />

        <button
          type="submit"
          disabled={mutationType.isPending}
        >
          {mutationType.isPending ? "Saving..." : postId?"Update Post":"Add Post"} 
        </button>
      </form>
    </div>
  );
};

export default AddPost;
