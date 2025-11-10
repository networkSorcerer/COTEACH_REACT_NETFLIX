import React from "react";
import Banner from "./components/banner/Banner";
import PopularMovieSlide from "./components/popularmoive/PopularMovieSlide";
import TopReated from "./components/TopRated/TopRated";
import UpComming from "./components/UpCommig/UpComming";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopReated />
      <UpComming />
    </div>
  );
};

export default HomePage;
