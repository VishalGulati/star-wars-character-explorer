import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { StarWarsCharacter } from "../../types";

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<StarWarsCharacter | null>(null);
  const [homeworld, setHomeworld] = useState("Loading...");
  const [films, setFilms] = useState<string[]>([]);
  const [starships, setStarships] = useState<string[]>([]);
  const { favourites = [], addToFavourites } = useContext(AppContext);

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${id}/`)
      .then((res) => res.json())
      .then(async (data) => {
        setCharacter(data);
        const planet = await fetch(data.homeworld).then((res) => res.json());
        setHomeworld(planet.name);
        const films = await Promise.all(
          data.films.map((url: string) => fetch(url).then((res) => res.json()))
        );
        setFilms(films.map((f) => f.title));
        const ships = await Promise.all(
          data.starships.map((url: string) =>
            fetch(url).then((res) => res.json())
          )
        );
        setStarships(ships.map((s) => s.name));
      });
  }, [id]);

  if (!character) return <div>Loading...</div>;

  const isFavourite = favourites.some((f: any) => f.name === character.name);

  return (
    <div>
      <h1>{character.name}</h1>
      <p>Hair Color: {character.hair_color}</p>
      <p>Eye Color: {character.eye_color}</p>
      <p>Gender: {character.gender}</p>
      <p>Home Planet: {homeworld}</p>
      <h2>Films</h2>
      <ul>
        {films.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <h2>Starships</h2>
      <ul>
        {starships.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
      {isFavourite ? (
        <Link to="/favourites">View Favourites</Link>
      ) : (
        <button onClick={() => addToFavourites(character)}>
          Add to Favourites
        </button>
      )}
    </div>
  );
};

export default CharacterDetails;
