import React, { Suspense } from "react";
import Banner from "./components/banner/Banner";
import PopularMovieSlide from "./components/popularmoive/PopularMovieSlide";
import TopReated from "./components/TopRated/TopRated";
import UpComming from "./components/UpCommig/UpComming";
import LoadingSpinner from "../../common/LoadingSpinner/LoadingSpinner";

const HomePage = () => {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <Banner />
        <PopularMovieSlide />
        <TopReated />
        <UpComming />
      </Suspense>
    </div>
  );
};

export default HomePage;
