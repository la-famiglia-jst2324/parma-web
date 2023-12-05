import { render } from '@testing-library/react';
import { CompaniesTable } from '@/components/Datasources/CompaniesTable';
import '@testing-library/jest-dom';

describe('CompaniesTable', () => {

  test('renders without crashing', () => {
    render(<CompaniesTable datasourceId="1" />);
  });

});
