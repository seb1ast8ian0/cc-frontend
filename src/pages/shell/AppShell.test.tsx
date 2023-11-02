import React from 'react';
import { render, screen } from '@testing-library/react';
import Shell from './AppShell';

test('renders learn react link', () => {
  render(<Shell><p>Test</p></Shell>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
