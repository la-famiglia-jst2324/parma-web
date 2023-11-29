import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatasourceTable from '@/components/Datasources/Table';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('DatasourceTable', () => {
  const mockData = [
    {
        id: 1,
        sourceName: 'datasource 1',
        description: 'description',
        isActive: true,
        defaultFrequency: '',
        healthStatus: 'up' as 'up' | 'down' | 'unknown',
      },
      {
        id: 2,
        sourceName: 'datasource 2',
        description: 'description',
        isActive: false,
        defaultFrequency: '',
        healthStatus: 'down' as 'up' | 'down' | 'unknown',
      },
  ];

  test('renders without crashing', () => {
    render(<DatasourceTable data={mockData} />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  test('renders table headers', () => {
    render(<DatasourceTable data={mockData} />);
    const headers = ['Datasource Name', 'Description', 'Status'];
    headers.forEach(header => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('renders correct number of rows', () => {
    render(<DatasourceTable data={mockData} />);
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockData.length + 1);
  });
});
