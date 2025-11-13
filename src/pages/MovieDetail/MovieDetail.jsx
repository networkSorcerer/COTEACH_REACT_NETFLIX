import React from "react";
import { useParams } from "react-router-dom";
import { useMoviesDetailQuery } from "../../hooks/useMovieDetail";
import { Badge, Container, Row, Col, Button } from "react-bootstrap";
import "./MovieDetail.style.css"; // 아래에 추가할 CSS 별도 관리
import Reviews from "./components/reviews/reviews";
import Recommend from "./components/recommend/recommend";
import { TrailerModal } from "./components/Modal/Modal";

const IMG_BASE_URL = "https://www.themoviedb.org/t/p/w500";

const MovieDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMoviesDetailQuery(id);
  const [modalShow, setModalShow] = React.useState(false);
  if (isLoading)
    return <div className="text-center text-light mt-5">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-danger mt-5">Error: {error.message}</div>
    );
  if (!data) return null;

  return (
    <div
      className="movie-detail-page"
      style={{
        backgroundImage: `url(${IMG_BASE_URL}${
          data.backdrop_path || data.poster_path
        })`,
      }}
    >
      <div className="movie-detail-overlay">
        <Container className="py-5">
          <Row className="align-items-center">
            {/* 포스터 영역 */}
            <Col md={4} className="text-center mb-4 mb-md-0">
              <img
                src={`${IMG_BASE_URL}${data.poster_path}`}
                alt={data.title}
                className="movie-poster shadow-lg"
              />
            </Col>

            {/* 정보 영역 */}
            <Col md={8} className="text-light">
              <h1 className="fw-bold mb-3">{data.title}</h1>

              {/* 장르 뱃지 */}
              <div className="mb-3">
                {data.genres.map((genre) => (
                  <Badge bg="danger" key={genre.id} className="me-2">
                    {genre.name}
                  </Badge>
                ))}
              </div>

              {/* 주요 정보 */}
              <div className="d-flex flex-wrap gap-3 mb-3 text-secondary">
                <div>⭐ 평점 {data.vote_average?.toFixed(1)}</div>
                <div>🔥 인기도 {Math.round(data.popularity)}</div>
                <div>{data.adult ? "🔞 성인관람불가" : "🧒 전체관람가"}</div>
                <div>⏱ {data.runtime}분</div>
                <div>📅 {data.release_date}</div>
              </div>

              {/* 예산 */}
              <div className="mb-4 text-secondary">
                💰 예산:{" "}
                {data.budget ? `$${data.budget.toLocaleString()}` : "정보 없음"}
              </div>

              {/* 줄거리 */}
              <p className="movie-overview mb-4">{data.overview}</p>

              {/* 버튼 */}
              <div className="d-flex gap-3">
                <Button
                  variant="danger"
                  size="lg"
                  onClick={() => setModalShow(true)}
                >
                  ▶ 재생
                </Button>
                <Button variant="outline-light" size="lg">
                  + 내 리스트
                </Button>
              </div>
            </Col>
          </Row>
          <Row className="review-area">
            <Reviews />
          </Row>
          <Row className="recommend-area">
            <Recommend />
          </Row>
        </Container>
      </div>
      <TrailerModal
        title={data.title}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default MovieDetail;
