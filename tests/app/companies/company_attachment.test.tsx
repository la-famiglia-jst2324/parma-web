import CompanyAttachment from '@/components/Companies/CompanyAttachment';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom'

describe('CompanyAttachment Component', () => {
  const dummyAttachment = {
    id: 1,
    name: 'Test Attachment',
    filetype: 'pdf',
  };


  test('renders CompanyAttachment component with correct attachment props', () => {
    render(<CompanyAttachment attachment={dummyAttachment} />);
    expect(screen.getByText(dummyAttachment.name)).toBeInTheDocument();
    expect(screen.getByText(`Filetype: ${dummyAttachment.filetype}`)).toBeInTheDocument();
  });

});
