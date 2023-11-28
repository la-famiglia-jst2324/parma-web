import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateDatasource from '@/components/Datasources/CreateDatasource';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('CreateDatasource', () => {
  test('renders without crashing', () => {
    render(<CreateDatasource />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

});
