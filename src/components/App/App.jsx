import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import NanniesPage from "../../pages/NanniesPage/NanniesPage";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage";
import NotFound from "../../pages/NotFound/NotFound";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Layout from "../Layout/Layout";
function App() {
  const isAuthenticated = true; // Update this based on your auth logic

  return (
    <Router>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nannies" element={<NanniesPage />} />
            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/favorites" element={<FavoritesPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
