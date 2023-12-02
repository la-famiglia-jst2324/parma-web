import GoBackButton from '@/components/Companies/GoBackButton';
import { render } from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom';

describe('GoBackButton Component', () => {
  test('renders GoBackButton component', () => {
    const { container } = render(<GoBackButton />);
    expect(container).toBeInTheDocument();
  });

});
