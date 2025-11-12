import { Suspense } from "react";
import api from "../utils/api";
import { useQuery } from "@tanstack/react-query";

const fetchMovieTrailer = (queryData) => {
  const id = queryData.queryKey[1];
  return api.get(`/movie/${id}/video?language=en-US`);
};

export const useMovieTrailerQuery = (id) => {
  return useQuery({
    queryKey: ["movie-trailer", id],
    queryFn: fetchMovieTrailer,
    Suspense: true,
    refechOnMount: false,
  });
};
