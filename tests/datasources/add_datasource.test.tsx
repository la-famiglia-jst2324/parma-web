import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateDatasourcePage from '@/app/datasources/add-datasource/page';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/add-datasource',
      pathname: '/add-datasource',
      query: '',
      asPath: '/add-datasource',
    };
  },
}));

describe('CreateDatasourcePage', () => {
  test('renders without crashing', () => {
    render(<CreateDatasourcePage />);
    const heading = screen.getByRole('heading', { name: /Create Datasource/i });
    expect(heading).toBeInTheDocument();
  });

  test('renders the GoBackButton', () => {
    render(<CreateDatasourcePage />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('renders the form', () => {
    render(<CreateDatasourcePage />);
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

    test('renders the form inputs', () => {
        render(<CreateDatasourcePage />);
        const nameInput = screen.getByLabelText('Datasource Name');
        const urlInput = screen.getByLabelText('Datasource URL');
        const descriptionInput = screen.getByLabelText('Datasource Description');
        expect(nameInput).toBeInTheDocument();
        expect(urlInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
    });

});
