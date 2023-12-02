import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import '@testing-library/jest-dom';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Home page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('renders without crashing', () => {});

  test('renders the Trending News header', () => {
    const header = screen.getByText('Trending News');
    expect(header).toBeInTheDocument();
  });

  test('renders the Top Buckets header', () => {
    const header = screen.getByText('Top Buckets');
    expect(header).toBeInTheDocument();
  });

});
