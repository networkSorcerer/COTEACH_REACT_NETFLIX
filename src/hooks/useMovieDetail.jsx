import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = (id) => {
  return api.get(`/movie/${id}`);
};

export const useMoviesDetailQuery = (id) => {
  return useQuery({
    queryKey: ["movie-detail", id], // ✅ id 포함!
    queryFn: () => fetchMovieDetail(id),
    suspense: true, // ✅ 옵션명은 소문자 suspense (React Query v4 기준)
    select: (result) => result.data,
    enabled: !!id, // ✅ id 없을 때 요청 방지 (추천)
  });
};
