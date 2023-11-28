import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabComponent } from '@/components/Datasources/TabComponent';

describe('TabComponent', () => {
  afterEach(cleanup);

  test('renders without crashing', () => {
    render(<TabComponent />);
  });

  test('renders "Companies Monitored" without crashing', () => {
    render(<TabComponent />);
    const tabComponent = screen.getByRole('button', { name: /Companies Monitored/i });
    expect(tabComponent).toBeInTheDocument();
  });

  test('renders "Companies Monitored" tab as active by default', () => {
    render(<TabComponent />);
    const tabContent = screen.getByRole('heading', { name: /Companies Monitored/i });
    expect(tabContent).toBeInTheDocument();
  });

  test('changes active tab on click', () => {
    render(<TabComponent />);
    const tabToClick = screen.getByRole('button', { name: /Datasource Health/i });
    fireEvent.click(tabToClick);
    expect(tabToClick.className).toContain('border-blue-500 text-blue-500');
  });

});
