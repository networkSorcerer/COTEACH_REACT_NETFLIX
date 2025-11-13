import { Modal as BootstrapModal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMovieTrailerQuery } from "../../../../hooks/useMovieTrailer";
import YouTube from "react-youtube";
import { useEffect, useState } from "react";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

export function TrailerModal(props) {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useMovieTrailerQuery(id);
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    if (data && data.results && data.results.length > 0) {
      const lastVideo = data.results[data.results.length - 1];
      setVideoId(lastVideo.key); // ✅ TMDB에서 제공하는 YouTube video key
    }
  }, [data]); // ✅ 반드시 배열

  const onPlayerReady = (event) => {
    event.target.playVideo(); // 자동 재생
  };

  if (isLoading)
    return <div className="text-center text-light mt-5">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-danger mt-5">Error: {error.message}</div>
    );
  if (!data) return null;

  return (
    <BootstrapModal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="bg-dark text-light"
    >
      <BootstrapModal.Header closeButton closeVariant="white">
        <BootstrapModal.Title id="contained-modal-title-vcenter">
          {props.title || "Trailer"}
        </BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body className="d-flex justify-content-center">
        {videoId ? (
          <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
        ) : (
          <div className="text-secondary">No trailer available</div>
        )}
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="outline-light" onClick={props.onHide}>
          Close
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}
