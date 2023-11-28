import CompaniesPage from '@/app/companies/page';
import { render, screen } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom'

describe('CompaniesPage Component', () => {
  test('renders CompaniesPage component with subscribed companies and all companies', async () => {
    render(<CompaniesPage />);
    expect(screen.getByText('Subscribed companies')).toBeInTheDocument();
    expect(screen.getByText('See all subscribed companies')).toBeInTheDocument();
  });

  test('displays "See all subscribed companies" link with correct href', async () => {
    render(<CompaniesPage />);
    const link = screen.getByText('See all subscribed companies');
    expect(link).toHaveAttribute('href', '/companies/subscribed-companies');
  });

});
