import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../src/app/App';

describe('portfolio routing', () => {
  it('renders the primary identity and project navigation', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: /John Brite/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Read .* case study/i })).toHaveLength(6);
    expect(screen.getByRole('link', { name: /Read Enterprise construction management/i })).toHaveAttribute('href', '/projects/enterprise-construction-platform');
    expect(screen.getByRole('link', { name: /Read Studio Application/i })).toHaveAttribute('href', '/projects/studio-application');
    expect(screen.getByRole('link', { name: /Read India One Charger/i })).toHaveAttribute('href', '/projects/india-one-charger');
    expect(screen.getByRole('link', { name: /Read SYED BAWKHER/i })).toHaveAttribute('href', '/projects/syed-bawkher');
    expect(screen.getByRole('link', { name: /Download resume/i })).toHaveAttribute('href', '/John-Brite-Resume.pdf');
  });

  it('renders a new project case study from its shared content', () => {
    render(<MemoryRouter initialEntries={['/projects/studio-application']}><App /></MemoryRouter>);
    expect(screen.getByRole('heading', { name: 'Studio Application' })).toBeInTheDocument();
    expect(screen.getByText('React | Spring Boot | MySQL | Java | Maven')).toBeInTheDocument();
  });
});
