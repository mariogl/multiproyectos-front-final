import { Navigate, Route, Routes } from "react-router-dom";
import ChallengesList from "./components/ChallengesList/ChallengesList";
import Navigation from "./components/Navigation/Navigation";
import ProjectsListPage from "./pages/ProjectsListPage/ProjectsListPage";

function App() {
  return (
    <>
      <header>
        <h1>Challenges</h1>
        <Navigation />
      </header>
      <main>
        <h2>Listado</h2>
        <Routes>
          <Route path="/challenges" element={<ChallengesList />} />
          <Route
            path="/projects/by-challenge/:challengeId"
            element={<ProjectsListPage />}
          />
          <Route path="/" element={<Navigate to="/challenges" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
