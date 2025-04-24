import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { extractIdFromUrl } from "../../utils";
import { StarWarsCharacter } from "../../types";

const CharacterList = () => {
  const [characters, setCharacters] = useState<StarWarsCharacter[]>([]);
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [page, setPage] = useState(1);
  const [homeworlds, setHomeworlds] = useState<Record<string, string>>({});
  const fetchedHomeworlds = useRef<Set<string>>(new Set());

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch(
          `https://swapi.dev/api/people/?search=${search}&page=${page}`
        );
        const data = await res.json();
        const results = data.results || [];
        setCharacters(results);

        const newHomeworlds: Record<string, string> = {};

        await Promise.all(
          results.map(async (char: any) => {
            const url = char.homeworld;
            if (url && !fetchedHomeworlds.current.has(url)) {
              fetchedHomeworlds.current.add(url);
              try {
                const res = await fetch(url);
                const planet = await res.json();
                newHomeworlds[url] = planet.name;
              } catch {
                newHomeworlds[url] = "Unknown";
              }
            }
          })
        );

        setHomeworlds((prev) => ({ ...prev, ...newHomeworlds }));
      } catch (error) {
        console.error("Failed to fetch characters:", error);
      }
    };

    fetchCharacters();
  }, [search, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 500);
  };

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={inputValue}
        onChange={handleSearchChange}
      />
      <ul>
        {characters.map((char, index) => {
          const id = extractIdFromUrl(char.url);
          return (
            <li key={index} style={{ cursor: "pointer" }}>
              <Link to={`/character/${id}`}>
                {char.name} - {char.gender} -{" "}
                {homeworlds[char.homeworld] || "Loading homeworld..."}
              </Link>
            </li>
          );
        })}
      </ul>
      <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Prev</button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
};

export default CharacterList;
