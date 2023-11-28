import DatasourceHealth from '@/components/Companies/DatasourceHealth';
import { render, screen } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom'

describe('DatasourceHealth Component', () => {
  interface Metric {
    name: string;
    status: 'Active' | 'Inactive';
  }


  const dummyMetrics: Metric[] = [
    { name: 'Metric1', status: 'Active' },
    { name: 'Metric2', status: 'Inactive' },
  ];


  test('renders DatasourceHealth component with name and metrics', () => {
    const datasourceName = 'Test Datasource';
    render(<DatasourceHealth name={datasourceName} metrics={dummyMetrics} />);


    expect(screen.getByText(datasourceName)).toBeInTheDocument();


    dummyMetrics.forEach((metric) => {
      expect(screen.getByText(metric.name)).toBeInTheDocument();
    });
  });

});
