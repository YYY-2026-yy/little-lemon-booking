import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Little Lemon 预订标题', () => {
  render(<App />);
  const heading = screen.getByText(/Little Lemon 预订餐桌/i);
  expect(heading).toBeInTheDocument();
});
