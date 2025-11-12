import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = () => {
  return api.get(`/movie/now_playing`);
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-now-playing"],
    queryFn: fetchTopRatedMovies,
    Suspense: true,
    select: (result) => result.data,
  });
};
