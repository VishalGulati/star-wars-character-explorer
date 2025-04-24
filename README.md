# Star Wars Character Explorer

This project is a React + TypeScript web application that fetches character data from the [SWAPI](https://swapi.dev) and allows users to browse, view, and manage a favourites list of Star Wars characters.

## Features

- Character list view with pagination and search by name
- Character detail view with personal details, films, and starships
- Favourites list management with ability to add/remove characters
- Bonus: Edit height or gender of a character in favourites

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/VishalGulati/star-wars-character-explorer.git
cd star-wars-character-explorer
npm install
# or
yarn install
```

### Run the App

```bash
npm start
# or
yarn start
```

### Run Tests

```bash
npm test
# or
yarn test
```

## Tech Stack

- React
- TypeScript
- React Router
- SWAPI ([https://swapi.dev](https://swapi.dev))
- CSS Modules / Tailwind CSS (optional)

## Folder Structure

```
src/
├── components/
│   ├── CharacterList.tsx
│   ├── CharacterDetail.tsx
│   ├── Favourites.tsx
├── context/
│   └── FavouritesContext.tsx
├── types/
│   └── index.ts
├── utils/
│   └── index.ts
├── App.tsx
├── index.js
```

## Thoughts on Scaling

If this project were to scale:

- Adopt component libraries like Chakra UI or Material UI
- Implement lazy loading & code splitting
- Use Redux or React Query for state and API management
- Apply role-based routing for different user permissions

## License

MIT


