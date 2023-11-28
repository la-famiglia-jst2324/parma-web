import PerformancePanel from '@/components/Companies/PerformancePanel';
import { render } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';

describe('PerformancePanel Component', () => {
  test('renders PerformancePanel component', () => {
    const { container } = render(<PerformancePanel />);
    expect(container).toBeInTheDocument();
  });

});
