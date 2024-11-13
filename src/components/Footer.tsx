import React from 'react';

import Container from '@/components/Container';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='mt-12 mb-8'>
      <Container className='flex justify-between gap-4'>
        <p className='text-sm'>Invoice App &copy; {new Date().getFullYear()}</p>
        <p className='text-sm'>
          Credit to Colby Fayock. Created using Next.js, Clerk, Drizzle and Neon
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
