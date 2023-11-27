import DataSourcesPanel from '@/components/Companies/DataSourcesPanel';
import { dummyDatasourceHealth } from '@/components/Companies/dummydata';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom'

describe('DataSourcesPanel', () => {
  test('renders the component without crashing', () => {
    render(<DataSourcesPanel />);
  });

  test('renders DatasourceHealth components based on dummy data', () => {
    const { getByText } = render(<DataSourcesPanel />);
    dummyDatasourceHealth.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });

});
