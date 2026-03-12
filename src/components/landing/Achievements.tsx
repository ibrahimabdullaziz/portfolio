import achievementsConfig from '@/config/Achievements';
import React from 'react';

import CertificatesGallery from '../CertificatesGallery';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

export default function Achievements() {
  return (
    <Container className="mt-10">
      <SectionHeading subHeading="My" heading="Certificates & Achievements" />
      <div className="mt-8">
        <CertificatesGallery certificates={achievementsConfig.certificates} />
      </div>
    </Container>
  );
}
