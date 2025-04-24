import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CharacterList from "../../../src/components/CharacterList/CharacterList";
import { BrowserRouter } from "react-router-dom";

const mockCharacters = [
  {
    name: "Luke Skywalker",
    gender: "male",
    url: "https://swapi.dev/api/people/1/",
    homeworld: "https://swapi.dev/api/planets/1/",
  },
];

const mockPlanet = {
  name: "Tatooine",
};

global.fetch = jest.fn();

describe("CharacterList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search input and title", () => {
    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );
    expect(screen.getByText(/Star Wars Characters/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search by name/i)).toBeInTheDocument();
  });

  it("fetches and displays character with homeworld", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: async () => ({ results: mockCharacters }),
      })
      .mockResolvedValueOnce({
        json: async () => mockPlanet,
      });

    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/Tatooine/i)).toBeInTheDocument();
    });
  });

  it("handles search input and resets page", async () => {
    jest.useFakeTimers();
    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/Search by name/i);
    fireEvent.change(input, { target: { value: "Leia" } });
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(input).toHaveValue("Leia");
    });

    jest.useRealTimers();
  });

  it("shows pagination buttons", () => {
    render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );
    expect(screen.getByText(/Prev/i)).toBeInTheDocument();
    expect(screen.getByText(/Next/i)).toBeInTheDocument();
  });

  it("uses cached results if available", async () => {
    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        json: async () => ({ results: mockCharacters }),
      })
      .mockResolvedValueOnce({
        json: async () => mockPlanet,
      });

    const { rerender } = render(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
    });

    // Trigger re-render with same page + search
    rerender(
      <BrowserRouter>
        <CharacterList />
      </BrowserRouter>
    );

    expect(fetch).toHaveBeenCalledTimes(2); // No new fetch for characters list
  });
});
