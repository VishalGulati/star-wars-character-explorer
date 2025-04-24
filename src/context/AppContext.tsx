import React, { createContext, useContext, useState } from "react";

interface Character {
  name: string;
  height?: string;
  gender?: string;
  [key: string]: any;
}

interface AppContextType {
  favourites: Character[];
  addToFavourites: (char: Character) => void;
  removeFromFavourites: (char: string) => void;
  updateFavourite: (name: string, updates: Partial<Character>) => void;
}

export const AppContext = createContext<AppContextType>({
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  updateFavourite: () => {},
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Character[]>([]);

  const addToFavourites = (char: Character) => {
    setFavourites((prev) =>
      prev.find((f) => f.name === char.name) ? prev : [...prev, char]
    );
  };

  const removeFromFavourites = (char: string) => {
    setFavourites((prev) => prev.filter((f) => f.name !== char));
  };

  const updateFavourite = (name: string, updates: Partial<Character>) => {
    setFavourites((prev) =>
      prev.map((f) => (f.name === name ? { ...f, ...updates } : f))
    );
  };

  return (
    <AppContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        updateFavourite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
