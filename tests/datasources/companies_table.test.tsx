import { render, screen } from '@testing-library/react';
import { CompaniesTable } from '@/components/Datasources/CompaniesTable';
import '@testing-library/jest-dom';


describe('CompaniesTable', () => {
  test('renders without crashing', () => {
    render(<CompaniesTable />);
    expect(screen.getByText('Company 1')).toBeInTheDocument();
  });

  test('renders correct number of companies', () => {
    render(<CompaniesTable />);
    const companies = screen.getAllByRole('row');
    expect(companies).toHaveLength(4);
  });

  test('renders correct company details', () => {
    render(<CompaniesTable />);
    expect(screen.getByText('Company 1')).toBeInTheDocument();
    expect(screen.getByText('Company 2')).toBeInTheDocument();
    expect(screen.getByText('Company 3')).toBeInTheDocument();
  });

    test('renders correct company status', () => {
        render(<CompaniesTable />);
        expect(screen.getByText('up')).toBeInTheDocument();
        expect(screen.getByText('down')).toBeInTheDocument();
        expect(screen.getByText('unknown')).toBeInTheDocument();
    });

    test('renders correct company name', () => {
        render(<CompaniesTable />);
        expect(screen.getByText('Company 1')).toBeInTheDocument();
        expect(screen.getByText('Company 2')).toBeInTheDocument();
        expect(screen.getByText('Company 3')).toBeInTheDocument();
    });

});
