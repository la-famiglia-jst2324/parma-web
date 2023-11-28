import { render, screen } from '@testing-library/react'
import Home from '@/app/page'
import '@testing-library/jest-dom'

describe('Home Page Test', () => {
  test('renders landing page', () => {
    const { getByText } = render(<Home />)
    // expect(getByText('Docs')).toBeInTheDocument()
    // expect(getByText('Find in-depth information about Next.js features and API.')).toBeInTheDocument()
    // TODO: add more assertions
  })

  test('renders the "Get started by editing" text', () => {
    render(<Home />);
    const text = screen.getByText(/Get started by editing/i);
    expect(text).toBeInTheDocument();
  });

  test('renders the "Sales" and "$ 71,465" text', () => {
    render(<Home />);
    const salesText = screen.getByText(/Sales/i);
    const salesValue = screen.getByText(/\$ 71,465/i);
    expect(salesText).toBeInTheDocument();
    expect(salesValue).toBeInTheDocument();
  });

  test('renders the "32% of annual target" text', () => {
    render(<Home />);
    const text = screen.getByText(/32% of annual target/i);
    expect(text).toBeInTheDocument();
  });

  test('renders the "Get started by editing" text', () => {
    render(<Home />);
    const text = screen.getByText(/Get started by editing/i);
    expect(text).toBeInTheDocument();
  });

  test('renders the "Learn" text', () => {
    render(<Home />);
    const texts = screen.getAllByText(/Learn/i);
    expect(texts.length).toBeGreaterThan(0);
  });

  test('renders the "Deploy" text', () => {
    render(<Home />);
    const texts = screen.getAllByText(/Deploy/i);
    expect(texts.length).toBeGreaterThan(0);
  });

})
