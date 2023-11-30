import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainLayout } from '@/components/MainLayout';
import { usePathname} from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('MainLayout', () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
  });

  test('renders without crashing', () => {
    render(<MainLayout><div>Test Child</div></MainLayout>);
  });

  test('renders the sidebar links', () => {
    render(<MainLayout><div>Test Child</div></MainLayout>);
    const dashboardLinks = screen.getAllByText(/Dashboard/i);
    const bucketsLink = screen.getByText(/Buckets/i);
    const companiesLink = screen.getByText(/Companies/i);
    const analyticsLink = screen.getByText(/Analytics/i);
    const datasourcesLink = screen.getByText(/Datasources/i);
    expect(dashboardLinks).toHaveLength(2);
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
