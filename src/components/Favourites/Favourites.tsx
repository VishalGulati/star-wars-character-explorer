import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Favourites = () => {
  const { favourites, removeFromFavourites, updateFavourite } =
    useContext(AppContext);

  return (
    <div>
      <h1>Favourites</h1>
      {favourites.length === 0 && <p>No favourites added yet.</p>}
      <ul>
        {favourites.map((char, index) => (
          <li key={index}>
            <p>Name: {char.name}</p>
            <p>
              Height:{" "}
              <input
                value={char.height}
                onChange={(e) =>
                  updateFavourite(char.name, { height: e.target.value })
                }
              />
            </p>
            <p>
              Gender:{" "}
              <input
                value={char.gender}
                onChange={(e) =>
                  updateFavourite(char.name, { gender: e.target.value })
                }
              />
            </p>
            <p>Home Planet: {char.homeworldName}</p>
            <button onClick={() => removeFromFavourites(char.name)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourites;
