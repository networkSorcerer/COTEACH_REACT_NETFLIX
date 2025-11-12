import React from "react";
import { Alert } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../../../../common/MovieCard/MovieCard";
import { useTopRatedMoviesQuery } from "../../../../hooks/useTopRated";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const TopReated = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();
  console.log("tttt", data);
  if (isLoading) {
    return <h1>Loading.....</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="On Screen"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default TopReated;
