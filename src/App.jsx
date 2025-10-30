import { Route, Routes } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/Homepage/HomePage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="movies">
              <Route index element={<MoviePage />} />
              <Route path=":id" element={<MovieDetail />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
