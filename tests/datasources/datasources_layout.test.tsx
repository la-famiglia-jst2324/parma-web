import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatasourcesLayout from '@/app/datasources/layout';

describe('DatasourcesLayout', () => {
  test('renders without crashing', () => {
    render(<DatasourcesLayout><div>Test Child</div></DatasourcesLayout>);
  });

  test('renders its children', () => {
    render(<DatasourcesLayout><div>Test Child</div></DatasourcesLayout>);
    const testChild = screen.getByText(/Test Child/i);
    expect(testChild).toBeInTheDocument();
  });
});
