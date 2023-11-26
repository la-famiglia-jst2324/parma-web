import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams } from 'next/navigation'
import DatasourcePage from '@/app/datasources/[id]/page'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: jest.fn(),
}));

describe('DatasourcePage', () => {
  test('renders without crashing', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    render(<DatasourcePage />);
  });

  test('renders the GoBackButton', () => {
    render(<DatasourcePage />);
    const goBackButton = screen.getByTestId('arrow-left-icon');
    expect(goBackButton).toBeInTheDocument();
  });

});
