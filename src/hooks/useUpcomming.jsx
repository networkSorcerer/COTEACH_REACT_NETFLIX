import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchUpcommingMovies = () => {
  return api.get(`/movie/upcoming`);
};

export const useUpcommingMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-upcomming"],
    queryFn: fetchUpcommingMovies,
    Suspense: true,
    select: (result) => result.data,
  });
};
