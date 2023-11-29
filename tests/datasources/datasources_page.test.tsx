import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatasourcesPage from '@/app/datasources/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('DatasourcesPage', () => {
  test('renders without crashing', () => {
    // When testing, code that causes React state updates should be wrapped into act(...)
    act(() => {
      render(<DatasourcesPage />);
    });
  });

  test('renders the DatasourcesLayout component', () => {
    act(() => {
      render(<DatasourcesPage />);
    });
    const datasourcesLayout = screen.getByTestId('datasources-layout');
    expect(datasourcesLayout).toBeInTheDocument();
  });

});
