import { render, screen, fireEvent } from '@testing-library/react';
import Favourites from '../../../src/components/Favourites/Favourites'; // Import your Favourites component
import { AppContext } from '../../../src/context/AppContext'; // Import AppContext
import React from 'react';

// Mock AppContext provider
const mockRemoveFromFavourites = jest.fn();
const mockUpdateFavourite = jest.fn();
const mockAddToFavourites = jest.fn();

const mockContextValue = {
  favourites: [
    { name: 'Luke Skywalker', height: '1.72', gender: 'male', homeworldName: 'Tatooine' },
    { name: 'Leia Organa', height: '1.5', gender: 'female', homeworldName: 'Alderaan' },
  ],
  removeFromFavourites: mockRemoveFromFavourites,
  updateFavourite: mockUpdateFavourite,
  addToFavourites: mockAddToFavourites
};

describe('Favourites component', () => {

  test('removes a character from favourites when remove button is clicked', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <Favourites />
      </AppContext.Provider>
    );

    // Click the remove button for the first character
    fireEvent.click(screen.getAllByText('Remove')[0]);

    // Check if removeFromFavourites was called with the correct name
    expect(mockRemoveFromFavourites).toHaveBeenCalledWith('Luke Skywalker');
  });

  test('updates character height when input value changes', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <Favourites />
      </AppContext.Provider>
    );

    // Find the input element for the first character's height
    const heightInput = screen.getByDisplayValue('1.72');
    
    // Simulate changing the height value
    fireEvent.change(heightInput, { target: { value: '1.75' } });

    // Check if updateFavourite was called with correct parameters
    expect(mockUpdateFavourite).toHaveBeenCalledWith('Luke Skywalker', { height: '1.75' });
  });

  test('updates character gender when input value changes', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <Favourites />
      </AppContext.Provider>
    );

    // Find the input element for the first character's gender
    const genderInput = screen.getByDisplayValue('male');
    
    // Simulate changing the gender value
    fireEvent.change(genderInput, { target: { value: 'female' } });

    // Check if updateFavourite was called with correct parameters
    expect(mockUpdateFavourite).toHaveBeenCalledWith('Luke Skywalker', { gender: 'female' });
  });

  test('displays "No favourites added yet" if no favourites are available', () => {
    const mockEmptyContextValue = {
      favourites: [],
      removeFromFavourites: mockRemoveFromFavourites,
      updateFavourite: mockUpdateFavourite,
      addToFavourites: mockAddToFavourites
    };

    render(
      <AppContext.Provider value={mockEmptyContextValue}>
        <Favourites />
      </AppContext.Provider>
    );

    // Ensure the "No favourites added yet" message is displayed
    expect(screen.getByText('No favourites added yet.')).toBeInTheDocument();
  });
});
