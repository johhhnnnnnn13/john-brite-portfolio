import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../src/app/App';

describe('portfolio routing', () => {
  it('renders the primary identity and project navigation', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /John Brite/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Read Enterprise construction management/i })).toHaveAttribute('href', '/projects/enterprise-construction-platform');
  });
});
