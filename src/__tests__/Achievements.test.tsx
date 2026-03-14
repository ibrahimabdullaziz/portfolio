import Achievements from '@/components/landing/Achievements';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

// Mock dependencies
vi.mock('@/config/Achievements', () => ({
  default: {
    certificates: [{ id: 1, title: 'Cert 1' }],
  },
}));

vi.mock('@/components/CertificatesGallery', () => ({
  default: ({ certificates }: any) => (
    <div data-testid="cert-gallery">
      {certificates.map((c: any) => (
        <div key={c.id}>{c.title}</div>
      ))}
    </div>
  ),
}));

describe('Achievements Component', () => {
  it('renders section heading', () => {
    render(<Achievements />);
    expect(screen.getByText(/My/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Certificates & Achievements/i),
    ).toBeInTheDocument();
  });

  it('renders the CertificatesGallery', () => {
    render(<Achievements />);
    expect(screen.getByTestId('cert-gallery')).toBeInTheDocument();
    expect(screen.getByText('Cert 1')).toBeInTheDocument();
  });
});
