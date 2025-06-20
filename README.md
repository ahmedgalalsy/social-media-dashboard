# Social Media Dashboard

A React-based dashboard application for visualizing and analyzing social media analytics data across multiple platforms.

## Features

- **Multi-platform Analytics**: Track metrics from Facebook, Twitter, Instagram, and LinkedIn
- **Interactive Charts**: Visualize engagement trends and audience distribution
- **Real-time Data**: Connect to backend APIs for up-to-date analytics
- **Advanced Filtering**: Sort, filter, and search through social media posts
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React 18
- Redux Toolkit for state management
- Recharts for data visualization
- Styled Components for styling
- Jest for unit testing

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm 6.0 or later

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/social-media-dashboard.git
cd social-media-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The application will be available at http://localhost:3000

## Project Structure

```
social-media-dashboard/
├── public/                  # Static files
├── src/                     # Source code
│   ├── api/                 # API service layer
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page components
│   ├── redux/               # Redux store and slices
│   ├── tests/               # Unit tests
│   ├── utils/               # Utility functions
│   ├── App.js               # Main App component
│   └── index.js             # Entry point
└── package.json             # Project dependencies
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

## API Integration

The dashboard is designed to connect with a backend API for social media data. Currently, it uses mock data for demonstration purposes. To connect with a real API:

1. Update the API endpoints in `src/api/socialMediaApi.js`
2. Modify the data structure in Redux slices if necessary

## Performance Optimizations

The application includes several performance optimizations:

- Memoization of expensive calculations with `useMemo`
- Prevention of unnecessary re-renders with `React.memo`
- Debouncing of search inputs to reduce state updates
- Throttling of API calls to prevent excessive requests

## Testing

Unit tests are written using Jest and React Testing Library. Run the tests with:

```bash
npm test
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Create React App for the initial project setup
- Recharts for the charting library
- Redux team for state management tools
