import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainLayout } from '@/components/dashboard';

describe('MainLayout', () => {
    test('renders without crashing', () => {
        render(<MainLayout><div>Test Child</div></MainLayout>);
        const testChild = screen.getByText(/Test Child/i);
        expect(testChild).toBeInTheDocument();
    });

  test('renders the sidebar links', () => {
    render(<MainLayout><div>Test Child</div></MainLayout>);
    const dashboardLink = screen.getByText(/Dashboard/i);
    const bucketsLink = screen.getByText(/Buckets/i);
    const companiesLink = screen.getByText(/Companies/i);
    const analyticsLink = screen.getByText(/Analytics/i);
    const datasourcesLink = screen.getByText(/Datasources/i);
    expect(dashboardLink).toBeInTheDocument();
    expect(bucketsLink).toBeInTheDocument();
    expect(companiesLink).toBeInTheDocument();
    expect(analyticsLink).toBeInTheDocument();
    expect(datasourcesLink).toBeInTheDocument();
  });

  test('renders the navbar link', () => {
    render(<MainLayout><div>Test Child</div></MainLayout>);
    const settingsLink = screen.getByText(/Settings/i);
    expect(settingsLink).toBeInTheDocument();
  });

    test('renders the navbar link', () => {
        render(<MainLayout><div>Test Child</div></MainLayout>);
        const settingsLink = screen.getByText(/Settings/i);
        expect(settingsLink).toBeInTheDocument();
    });

});
