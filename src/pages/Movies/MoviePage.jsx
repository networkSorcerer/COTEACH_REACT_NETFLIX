import React, { useState, useMemo } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Button, Col, Container, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";

const MoviePage = () => {
  const [query] = useSearchParams();
  const [page, setPage] = useState(1);
  const [orderPopularity, setOrderPopularity] = useState(null); // null=기본, true=오름차순, false=내림차순
  const [selectedGenre, setSelectedGenre] = useState(null); // 선택된 장르 ID
  const navigate = useNavigate();

  const { data: genreData } = useMovieGenreQuery();
  const keyword = query.get("q");

  React.useEffect(() => {
    if (!keyword) {
      navigate("/movies"); // 홈 또는 리스트 페이지
    } else {
      setPage(1);
    }
  }, [keyword, navigate]);

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  // 페이지 클릭 시
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  // ✅ 정렬 및 필터링 로직
  const filteredAndSortedMovies = useMemo(() => {
    if (!data?.results) return [];

    let movies = [...data.results];

    // 장르 필터링
    if (selectedGenre) {
      movies = movies.filter((movie) =>
        movie.genre_ids.includes(selectedGenre)
      );
    }

    // 인기순 정렬
    if (orderPopularity !== null) {
      movies.sort((a, b) =>
        orderPopularity
          ? a.popularity - b.popularity
          : b.popularity - a.popularity
      );
    }

    return movies;
  }, [data, selectedGenre, orderPopularity]);

  // ✅ 로딩/에러/빈 배열 처리
  if (isLoading)
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );

  if (isError) return <Alert variant="danger">{error.message}</Alert>;

  if (filteredAndSortedMovies.length === 0)
    return (
      <Container className="text-center mt-5">
        <h4>검색 결과가 없습니다.</h4>
      </Container>
    );

  // ✅ 정렬 토글 핸들러
  const handleOrderByPopularity = () => {
    if (orderPopularity === null)
      setOrderPopularity(false); // 처음 클릭 시 내림차순(인기 많은 순)
    else setOrderPopularity(!orderPopularity); // 토글
  };

  return (
    <Container>
      <Row>
        {/* 사이드 필터 영역 */}
        <Col lg={3} xs={12} className="mb-4">
          <h5 className="text-light mb-3">필터</h5>
          <Button
            variant="danger"
            className="w-100 mb-3"
            onClick={handleOrderByPopularity}
          >
            인기순{" "}
            {orderPopularity === null
              ? ""
              : orderPopularity
              ? "(오름차순 ↑)"
              : "(내림차순 ↓)"}
          </Button>

          <div className="d-flex flex-wrap gap-2">
            {genreData?.map((genre) => (
              <Button
                key={genre.id}
                variant={selectedGenre === genre.id ? "light" : "outline-light"}
                size="sm"
                onClick={() =>
                  setSelectedGenre(selectedGenre === genre.id ? null : genre.id)
                }
              >
                {genre.name}
              </Button>
            ))}
          </div>
        </Col>

        {/* 영화 카드 영역 */}
        <Col lg={9} xs={12}>
          <Row>
            {filteredAndSortedMovies.map((movie, index) => (
              <Col key={index} lg={4} xs={12} className="mb-4">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>

          {/* 페이지네이션 */}
          {!selectedGenre && (
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data?.total_pages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination justify-content-center"
              activeClassName="active"
              forcePage={page - 1}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
