import SubscribedCompaniesPage from '@/app/companies/subscribed-companies/page';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom'

describe('subscribedCompaniesPage Component', () => {
  test('renders SubscribedCompaniesPage component with subscribed companies and all companies', async () => {
    render(<SubscribedCompaniesPage />);
    await waitFor(() => {
      expect(screen.getByText('Subscribed companies')).toBeInTheDocument();
    });
  });

});
