import React from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Container from '@/components/Container';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='mt-8 my-12'>
      <Container>
        <div className='flex justify-between items-center gap-4'>
          <p className='font-bold'>
            <Link href='/dashboard'>Invoice World</Link>
          </p>

          <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
