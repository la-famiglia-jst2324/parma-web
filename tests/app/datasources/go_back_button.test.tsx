import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GoBackButton from '@/components/Datasources/GoBackButton';

describe('GoBackButton', () => {
  test('renders without crashing', () => {
    render(<GoBackButton />);
    const linkElement = screen.getByRole('link');
    expect(linkElement).toBeInTheDocument();
  });

  test('renders the ArrowLeftIcon', () => {
    render(<GoBackButton />);
    const icon = screen.getByTestId('arrow-left-icon');
    expect(icon).toBeInTheDocument();
  });

    test('renders the link to /datasources', () => {
        render(<GoBackButton />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/datasources');
    });

});
