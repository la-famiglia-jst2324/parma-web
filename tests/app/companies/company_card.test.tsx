import CompanyCard from '@/components/Companies/CompanyCard';
import { render, screen } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom'

describe('CompanyCard Component', () => {
  const dummyProps = {
    name: 'Test Company',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    activeDatasources: 5,
    inactiveDatasources: 2,
  };


  test('renders CompanyCard component with correct props', () => {
    render(<CompanyCard {...dummyProps} />);
    expect(screen.getByText(dummyProps.name)).toBeInTheDocument();
    expect(screen.getByText(dummyProps.description)).toBeInTheDocument();
    expect(screen.getByText(`${dummyProps.activeDatasources} Active Datasources`)).toBeInTheDocument();
    expect(screen.getByText(`${dummyProps.inactiveDatasources} Inactive Datasources`)).toBeInTheDocument();
  });


  test('displays "View more" button with correct link', () => {
    render(<CompanyCard {...dummyProps} />);
    const viewMoreButton = screen.getByRole('button', { name: /view more/i });
    expect(viewMoreButton).toBeInTheDocument();
  });
});
