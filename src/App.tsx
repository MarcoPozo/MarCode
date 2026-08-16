import { Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home/Home";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import NotFound from "./pages/NotFound/NotFound";
import "./styles/globals.css";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
