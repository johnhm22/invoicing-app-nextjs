import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex flex-col h-full justify-center text-center gap-6 pb-8 mx-auto border border-red-500'>
      <h1 className='text-5xl font-bold'>Invoice World</h1>
      <p>
        <Button asChild>
          <Link href='/dashboard'>Sign In</Link>
        </Button>
      </p>
    </main>
  );
}
