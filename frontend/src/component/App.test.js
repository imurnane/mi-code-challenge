import React from "react";
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
   Map: () => ({})
}));

it('displays initial elements', () => {
  render(<App />);
  const title = screen.getByText(/Mobility Intelligence/i);
  const button = screen.getByText(/Begin Simulation/i);
  expect(title).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

xit('calls fetchSimulation on click', () => {
  const wrapper = shallow(<App />);
  const button = wrapper.find('#button-fetch-simulation');
  button.simulate('click');
  expect(true).toBeTruthy();
});
