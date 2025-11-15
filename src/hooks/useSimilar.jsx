import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
const fetchSimilarMovie = (id) => {
  return api.get(`/movie/${id}/similar`);
};
export const useRecommendQuery = (id) => {
  return useQuery({
    queryKey: ["movie-similar", id],
    queryFn: () => fetchSimilarMovie(id),
    suspense: true,
    select: (result) => result.data,
  });
};
