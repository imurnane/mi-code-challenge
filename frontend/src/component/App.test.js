import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
   Map: () => ({})
}));

test('renders learn react link', () => {
  render(<App />);
  const textElement = screen.getByText(/Code Challenge/i);
  expect(textElement).toBeInTheDocument();
});
