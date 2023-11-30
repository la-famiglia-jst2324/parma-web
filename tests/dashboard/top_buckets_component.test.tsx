import { render, screen } from '@testing-library/react';
import TopBucketsCard from '@/components/Dashboard/TopBucketsCard';
import '@testing-library/jest-dom';

describe('TopBucketsCard Test', () => {
  const mockBucketItem = {
    id: 1,
    name: 'Test Bucket',
    description: 'Test Description',
    numberOfCompanies: 5,
  };

  it('renders without crashing', () => {
    render(<TopBucketsCard {...mockBucketItem} />);
    expect(screen.getByText('Test Bucket')).toBeInTheDocument();
  });

  it('renders the number of companies', () => {
    render(<TopBucketsCard {...mockBucketItem} />);
    expect(screen.getByText('5 companies')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<TopBucketsCard {...mockBucketItem} />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders the view more link', () => {
    render(<TopBucketsCard {...mockBucketItem} />);
    expect(screen.getByText('View More')).toHaveAttribute('href', '/buckets/1');
  });
});
