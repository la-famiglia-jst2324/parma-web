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
    render(<DatasourcePage params={{id:'1'}} ></DatasourcePage>);
  });

  test('renders loading message', () => {
    render(<DatasourcePage params={{id:'1'}} ></DatasourcePage>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

});
