import React from "react";
import { useParams } from "react-router-dom";
import { useRecommendQuery } from "../../../../hooks/useSimilar";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const Recommend = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useRecommendQuery(id);
  console.log("cccc", data);
  if (isLoading)
    return <div className="text-center text-light mt-5">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-danger mt-5">Error: {error.message}</div>
    );
  if (!data) return null;
  return (
    <div>
      {" "}
      <MovieSlider
        title="Recommend Movies"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default Recommend;
