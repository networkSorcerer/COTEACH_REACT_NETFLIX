import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";

const Banner = () => {
  const { data, isLoading, error, isError } = usePopularMoviesQuery();
  return <div></div>;
};

export default Banner;
