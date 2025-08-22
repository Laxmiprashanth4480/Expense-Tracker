import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock HomePage to avoid module side effects during tests
jest.mock('./pages/HomePage', () => () => <div>HomePage</div>);
jest.mock('./pages/Register', () => () => <div>Register</div>);
jest.mock('./pages/Login', () => () => <div>Login</div>);
jest.mock('./pages/LandingPage', () => () => <div>Pocketly</div>);
jest.mock('./components/Chatbot', () => () => <div>Chatbot</div>);

import App from './App';

test('renders Pocketly landing page text', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const pocketlyText = screen.getByText(/pocketly/i);
  expect(pocketlyText).toBeInTheDocument();
});
