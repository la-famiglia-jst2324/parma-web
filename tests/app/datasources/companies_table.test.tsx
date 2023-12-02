import { render, screen } from '@testing-library/react';
import { CompaniesTable } from '@/components/Datasources/CompaniesTable';
import '@testing-library/jest-dom';


describe('CompaniesTable', () => {

  test('renders without crashing', () => {
    render(<CompaniesTable id="1" />);
    expect(screen.getByText('Company 1')).toBeInTheDocument();
  });

  test('renders correct number of companies', () => {
    render(<CompaniesTable id="1" />);
    const companies = screen.getAllByRole('row');
    expect(companies).toHaveLength(4);
  });

});
