'use client'; // Error components must be Client Components

import { useEffect } from 'react';

// app/error捕获所有page的error
export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>[@/error] Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
