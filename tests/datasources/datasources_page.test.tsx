import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import DatasourcesPage from '@/app/datasources/page';

jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: jest.fn(),
    }),
}));

describe('DatasourcesPage', () => {
  test('renders without crashing', () => {
    render(<DatasourcesPage />);
  });

  test('renders the DatasourcesLayout component', () => {
    const { push } = useRouter();
    render(<DatasourcesPage />);
    const datasourcesLayout = screen.getByTestId('datasources-layout');
    expect(datasourcesLayout).toBeInTheDocument();
  });

});
