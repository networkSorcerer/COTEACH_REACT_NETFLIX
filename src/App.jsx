import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/Homepage/HomePage";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetail from "./pages/MovieDetail/MovieDetail";

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
        </Routes>
      </div>
    </>
  );
}

export default App;
