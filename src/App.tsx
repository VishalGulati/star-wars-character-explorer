import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CharacterList from "./components/CharacterList/CharacterList";
import CharacterDetails from "./components/CharacterDetails/CharacterDetails";
import Favourites from "./components/Favourites/Favourites";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <Router>
      <AppProvider>
        <nav
          style={{ padding: "1rem", background: "#eee", marginBottom: "1rem" }}
        >
          <Link to="/" style={{ marginRight: "1rem" }}>
            Characters
          </Link>
          <Link to="/favourites">Favourites</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
