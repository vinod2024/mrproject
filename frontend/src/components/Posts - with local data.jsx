import { useState } from "react";
import { deletePost, fetchPosts, updatePost } from "../api/PostsApi";
import { keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const Posts = () => {
  const totalRecards = 98;
  const recardPerPage = 5;
  const totalPages = Math.ceil(totalRecards/recardPerPage);
  // console.log("totalPage: ", totalPage);
  const [pageNumber, setPageNumber] = useState(0);
  const [deleteData, setDeleteData] = useState(0);

  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber], // useState
    queryFn: () => fetchPosts(pageNumber), // useEffect
    // gcTime:1000, // get data from cache and update by every request if any change in result set.(default value 5 mins)
    // staleTime:5000, // default 0, get data from cache and will not send request to api during staletime.
    // refetchInterval:5000, // send request automaticall after every 1 second.
    // refetchIntervalInBackground:true, // send request in background.
    // placeholderData: keepPreviousData, //loding will not display during fetch data because prevous data will be show until fetch data. 
  });

  // useMutation function.
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess:(data,id) => {
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem?.filter((post) =>post.id !== id)
      });
      // setDeleteData(1);
    },
  });

  // update
  const updateMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess:(apiData,postId) => {
      queryClient.setQueryData(["posts", pageNumber], (postsData) => {
        return postsData?.map((curPost) =>{
          return curPost.id === postId 
          ? { ...curPost, title: apiData.title }
          : curPost;
        });
      });
    },
  });

  // loading.
  if(isPending) return <p>Loading...</p>
  if(isError) return <p>Error: {error.message || "Something went wrong!"}</p>

  // paging.
  const getPaginationPages = (totalPages, currentPage) => {
    const maxPagesToShow = 5;
    let start = Math.max(1, currentPage - 5);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);

    // Adjust start if end reached last page
    start = Math.max(1, end - maxPagesToShow + 1);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
  const pages = getPaginationPages(totalPages, pageNumber);

  return (
    
    <div>
      <ul className="list-group">
        {data?.map((curElem) => {
          const {id, title, body} = curElem;
          return (
            <li key={id} className="list-group-item">

            <p className="fw-bold text-capitalize">{id} {title}</p>
            <p>{body}</p>

            <button onClick={()=>deleteMutation.mutate(id)}>Delete</button>
            <button onClick={()=>updateMutation.mutate(id)}>Update</button>
          </li>
          )
        })};
        
      </ul>

      <div className="d-grid gap-2 d-md-block">
        <button  type="button" className="btn btn-primary" disabled={pageNumber==0 ? true : false} onClick={()=>setPageNumber((prev) =>prev-recardPerPage)}>Prev</button>
        {pages.map((page) => (
          <button
            key={page}
            className={page === pageNumber ? "active" : ""}
            onClick={() => setPageNumber((page-1)*recardPerPage)}
          >
            {page}
          </button>
        ))}
        <button type="button" className="btn btn-primary" onClick={()=>setPageNumber((prev) =>prev+recardPerPage)}>Next</button>        
      </div>

      
    </div>
  )

};
