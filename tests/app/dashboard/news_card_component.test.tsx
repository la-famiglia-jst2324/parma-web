import { render, screen } from '@testing-library/react';
import NewsCard from '@/components/Dashboard/NewsCard';
import '@testing-library/jest-dom';

describe('NewsCard', () => {
  const mockNewsItem = {
    id:1,
    title: 'Test Title',
    companyName: 'Test Company',
    datasourceName: 'Test Datasource',
    timestamp: '2022-01-01',
    description: 'Test Description',
    link: 'https://test.com',
    icon: '/path/to/icon.png',
  };

  test('renders without crashing', () => {
    render(<NewsCard {...mockNewsItem} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Company')).toBeInTheDocument();
    expect(screen.getByText('Test Datasource')).toBeInTheDocument();
    expect(screen.getByText("Published: 2022-01-01")).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Read full story here')).toHaveAttribute('href', 'https://test.com');
  });

});
