import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContext } from "../../../src/context/AppContext";
import CharacterDetails from "../../../src/components/CharacterDetails/CharacterDetails";



const mockContextValue = {
    favourites: [],
    addToFavourites: jest.fn(),
    removeFromFavourites: jest.fn(),
    updateFavourite: jest.fn(),
};

const characterMock = {
    name: "Luke Skywalker",
    hair_color: "blond",
    eye_color: "blue",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/"],
    starships: ["https://swapi.dev/api/starships/12/"],
};

const planetMock = { name: "Tatooine" };

const filmMock = { title: "A New Hope" };

const starshipMock = { name: "X-Wing" };

describe("CharacterDetails", () => {

    beforeAll(() => {
        // Replace global.fetch with a Jest mock
        global.fetch = jest.fn();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("displays character details after fetching data", async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({ json: () => Promise.resolve(characterMock) }) // Mock character fetch
            .mockResolvedValueOnce({ json: () => Promise.resolve(planetMock) }) // Mock planet fetch
            .mockResolvedValueOnce({ json: () => Promise.resolve(filmMock) }) // Mock film fetch
            .mockResolvedValueOnce({ json: () => Promise.resolve(starshipMock) }); // Mock starship fetch

        render(
            <Router>
                <AppContext.Provider value={mockContextValue}>
                    <CharacterDetails />
                </AppContext.Provider>
            </Router>
        );

        await waitFor(() => screen.getByText(/Luke Skywalker/));

        expect(screen.getByText(/Luke Skywalker/)).toBeInTheDocument();
        expect(screen.getByText(/Hair Color: blond/)).toBeInTheDocument();
        expect(screen.getByText(/Eye Color: blue/)).toBeInTheDocument();
        expect(screen.getByText(/Gender: male/)).toBeInTheDocument();
        expect(screen.getByText(/Home Planet: Tatooine/)).toBeInTheDocument();
        expect(screen.getByText(/A New Hope/)).toBeInTheDocument();
        expect(screen.getByText(/X-Wing/)).toBeInTheDocument();
    });

    test("displays 'Add to Favourites' button when character is not in favourites", async () => {
        (fetch as jest.Mock)
            .mockResolvedValueOnce({ json: () => Promise.resolve(characterMock) })
            .mockResolvedValueOnce({ json: () => Promise.resolve(planetMock) })
            .mockResolvedValueOnce({ json: () => Promise.resolve(filmMock) })
            .mockResolvedValueOnce({ json: () => Promise.resolve(starshipMock) });

        render(
            <Router>
                <AppContext.Provider value={mockContextValue}>
                    <CharacterDetails />
                </AppContext.Provider>
            </Router>
        );

        await waitFor(() => screen.getByText(/Luke Skywalker/));

        const addButton = screen.getByText(/Add to Favourites/);
        expect(addButton).toBeInTheDocument();

        fireEvent.click(addButton);
        expect(mockContextValue.addToFavourites).toHaveBeenCalledWith(characterMock);
    });

    test("displays 'View Favourites' link when character is already a favourite", async () => {
        const mockContextValueWithFavourites = {
            favourites: [characterMock],
            addToFavourites: jest.fn(),
            removeFromFavourites: jest.fn(),
            updateFavourite: jest.fn(),
        };

        (fetch as jest.Mock)
            .mockResolvedValueOnce({ json: () => Promise.resolve(characterMock) })
            .mockResolvedValueOnce({ json: () => Promise.resolve(planetMock) })
            .mockResolvedValueOnce({ json: () => Promise.resolve(filmMock) })
            .mockResolvedValueOnce({ json: () => Promise.resolve(starshipMock) });

        render(
            <Router>
                <AppContext.Provider value={mockContextValueWithFavourites}>
                    <CharacterDetails />
                </AppContext.Provider>
            </Router>
        );

        await waitFor(() => screen.getByText(/Luke Skywalker/));

        const viewFavouritesLink = screen.getByText(/View Favourites/);
        expect(viewFavouritesLink).toBeInTheDocument();
    });
});
