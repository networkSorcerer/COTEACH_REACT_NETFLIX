import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();
  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };
  const MovieDetail = (id) => {
    navigate(`/movies/${id}`);
  };
  return (
    <div
      style={{
        width: "200px",
        height: "300px",
        backgroundColor: "#000", // 기본 검은 배경
        backgroundImage: movie.poster_path
          ? `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "2rem",
      }}
      className="movie_card"
      onClick={() => MovieDetail(movie.id)}
    >
      {movie.poster_path ? (
        <div className="overlay">
          <h1>{movie.title}</h1>

          <div className="genres">
            {showGenre(movie.genre_ids).map((id) => (
              <Badge bg="danger" key={id}>
                {id}
              </Badge>
            ))}
          </div>

          <div className="info">
            <div>⭐ {movie.vote_average}</div>
            <div>🔥 {Math.round(movie.popularity)}</div>
            <div>{movie.adult ? "🔞 over18" : "🧒 under18"}</div>
          </div>
        </div>
      ) : (
        <p>no image</p>
      )}
    </div>
  );
};

export default MovieCard;
