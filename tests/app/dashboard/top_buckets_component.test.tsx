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

  test('renders without crashing', () => {
    render(<TopBucketsCard {...mockBucketItem} />);
    expect(screen.getByText('Test Bucket')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('5 companies')).toBeInTheDocument();
    expect(screen.getByText('View More')).toHaveAttribute('href', '/buckets/1');
  });

});
