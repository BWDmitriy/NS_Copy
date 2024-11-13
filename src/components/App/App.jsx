import { Suspense, lazy } from "react";
import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Loader from "../Loader/Loader";
import NotFound from "../../pages/NotFound/NotFound";
const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const NanniesPage = lazy(() => import("../../pages/NanniesPage/NanniesPage"));
const FavoritesPage = lazy(() =>
  import("../../pages/FavoritesPage/FavoritesPage")
);
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import { useTheme } from "../ThemeButton/ThemeContext";

import "../App/App.css";
import Layout from "../Layout/Layout";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const isAuthenticated = true;

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          {/* <Route
              path="/favorites"
              element={
                // <PrivateRoute isAuthenticated={isAuthenticated}>
                  <FavoritesPage />
                </PrivateRoute>
              }
            /> */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/favorites" element={<FavoritesPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
