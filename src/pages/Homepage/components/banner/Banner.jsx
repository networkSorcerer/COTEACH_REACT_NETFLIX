import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";

const Banner = () => {
  const { data } = usePopularMoviesQuery();
  return <div></div>;
};

export default Banner;
