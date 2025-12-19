import React from "react";
import { useEffect, useState } from "react";
import { getMovie } from "../api/MovieApi";
import {Card} from "../components/UI/Card";
export const Movies = () => {
  // const moviesData = useLoaderData();
  // console.log(moviesData);
  const [moviesData, setMoviesData] = useState([]);

  const getMovieData = async() => {
    try{
      const res = await getMovie();
      console.log((res.data.Search));
      setMoviesData(res.data.Search);
    } catch (error){
      console.log("console Error:", error.message);
      console.log("console Status:", error.response.staus);
      console.log("console Data:", error.response.data);
    }
  }

  useEffect(()=>{
    getMovieData();
  }, []);

  return (
    <>
    <div className="row ">
    <ul className="grid grid-four--cols">
      {moviesData &&
        moviesData.map((curMovie) => {
          return <Card key={curMovie.imdbID} curMovie={curMovie} />;
        })}
    </ul>
    </div>
    </>
  );
};