import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabComponent } from '@/components/Datasources/TabComponent';

describe('TabComponent', () => {
  test('renders without crashing', () => {
    render(<TabComponent />);
    const tabComponent = screen.getByRole('button', { name: /Companies Monitored/i });
    expect(tabComponent).toBeInTheDocument();
  });

  test('renders "Companies Monitored" tab as active by default', () => {
    render(<TabComponent />);
    const activeTab = screen.getByRole('button', { name: /Scraping Information/i });
    expect(activeTab.className).toContain('border-b-4');
  });

  test('changes active tab on click', () => {
    render(<TabComponent />);
    const tabToClick = screen.getByRole('button', { name: /Datasource Health/i });
    fireEvent.click(tabToClick);
    expect(tabToClick.className).toContain('border-b-4');
  });

    test('renders "Companies Monitored" tab content by default', () => {
        render(<TabComponent />);
        const tabContent = screen.getByText('Companies Monitored by this Datasource');
        expect(tabContent).toBeInTheDocument();
    });

    test('renders "Scraping Information" tab content on click', () => {
        render(<TabComponent />);
        const tabToClick = screen.getByRole('button', { name: /Scraping Information/i });
        fireEvent.click(tabToClick);
        const tabContent = screen.getByText('Scraping Information');
        expect(tabContent).toBeInTheDocument();
    });

    test('renders "Datasource Health" tab content on click', () => {
        render(<TabComponent />);
        const tabToClick = screen.getByRole('button', { name: /Datasource Health/i });
        fireEvent.click(tabToClick);
        const tabContent = screen.getByText('Datasource Health');
        expect(tabContent).toBeInTheDocument();
    });

});
