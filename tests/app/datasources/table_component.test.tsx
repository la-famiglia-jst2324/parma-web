import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatasourceTable from '@/components/Datasources/Table';
import { Frequency } from '@prisma/client';
import Datasource from '@/types/datasource';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('DatasourceTable', () => {
  const mockData : Datasource[] = [
    {
      id: 1,
      sourceName: 'Source 1',
      description: 'Description 1',
      isActive: true,
      defaultFrequency: Frequency.DAILY,
      healthStatus: 'UP',
    },
      {
        id: 2,
        sourceName: 'datasource 2',
        description: 'description',
        isActive: false,
        defaultFrequency: Frequency.WEEKLY,
        healthStatus: 'DOWN'
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
