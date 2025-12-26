import { useState } from "react";
import { deletePost, fetchPosts, updatePost } from "../api/PostsApi";

import { keepPreviousData, QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { navigateTo } from "../../utils/navigation";

export const Posts = () => { 
  // const navigate = useNavigate();
  /* const totalRecards = 98;
  const recardPerPage = 5;
  const totalPages = Math.ceil(totalRecards/recardPerPage); */
  // console.log("totalPage: ", totalPage);
  // const [pageNumber, setPageNumber] = useState(0);
  const [deleteData, setDeleteData] = useState(0);

  const { pageno } = useParams();
  console.log('pageno', pageno);
  const [page, setPage] = useState(pageno?pageno:1);

  const queryClient = useQueryClient();
  const { data, isPending, isError, isFetching, error } = useQuery({
    queryKey: ["posts", page], // useState
    queryFn: () => fetchPosts(page), // useEffect
    // queryFn: () => fetchPosts({ page }),
    // gcTime:1000, // get data from cache and update by every request if any change in result set.(default value 5 mins)
    // staleTime:5000, // default 0, get data from cache and will not send request to api during staletime.
    // refetchInterval:5000, // send request automaticall after every 1 second.
    // refetchIntervalInBackground:true, // send request in background.
    // placeholderData: keepPreviousData, //loding will not display during fetch data because prevous data will be show until fetch data. 
  });

  // console.log("first: ",data);

  // useMutation function.
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    /* onSuccess:(data,id) => {
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem?.filter((post) =>post.id !== id)
      });
      // setDeleteData(1);
    }, */
    onSuccess: () => {
      // queryClient.invalidateQueries(["posts", pageNumber]);
      queryClient.invalidateQueries();
    },

    onError: (error) => {
      console.error(error.message);
      // navigate('/login');
    }
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
  if(isPending || isFetching) return <p>Loading...</p>
  if(isError) return <p>Error: {error.message || "Something went wrong!"}</p>

  // paging.
  /* const getPaginationPages = (totalPages, currentPage) => {
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
  const pages = getPaginationPages(totalPages, pageNumber); */


  const getPageNumbers = (current, total) => {
    const max = 5;
    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + max - 1);

    if (end - start < max - 1) {
      start = Math.max(1, end - max + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const addPostForm = (id=0) =>{
    // const navigate = useNavigate();
    const idVal = (id>0)?'/'+id+'/'+page:'';    
    navigateTo(`/add-posts${idVal}`, {
      replace: true,
    });
  }
  return (
    
    <div>
      <button onClick={addPostForm}>Add Post</button>

      <ul className="list-group">
        {data.data?.map((curElem) => {
          const {id, title, body} = curElem;
          return (
            <li key={id} className="list-group-item">

            <p className="fw-bold text-capitalize">{id} {title}</p>
            <p>{body}</p>

            <button onClick={()=>deleteMutation.mutate(id)}>Delete</button>
            {/* <button onClick={()=>updateMutation.mutate(id)}>Update</button> */}
            <button onClick={()=>addPostForm(id)}>Update</button>
          </li>
          )
        })};
        
      </ul>


      {/* PAGINATION */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>


        {getPageNumbers(page, data.totalPages).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{
              margin: "0 5px",
              fontWeight: p === page ? "bold" : "normal",
            }}
          >
            {p}
          </button>
        ))}


        <span style={{ margin: "0 10px" }}>
          Page {page} of {data.totalPages}
        </span>

        

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page === data.totalPages}
        >
          Next
        </button>

        {isFetching && <span> Fetching...</span>}
      </div>


      {/* <div className="d-grid gap-2 d-md-block">
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
      </div> */}

      
    </div>
  )

};
