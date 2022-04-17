import ChallengesList from "./components/ChallengesList/ChallengesList";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <>
      <header>
        <h1>Challenges</h1>
        <Navigation />
      </header>
      <main>
        <h2>Listado</h2>
        <ChallengesList />
      </main>
    </>
  );
}

export default App;
