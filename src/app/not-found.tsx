import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center min-h-screen p-4 text-center font-sans bg-[#F4EEE1] text-[#2B2523]">
        <h1 className="text-4xl font-serif font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-sm text-stone-600 mb-6">
          The requested page could not be found.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg bg-[#1E3B2A] text-white font-semibold text-sm hover:opacity-90"
        >
          Return to Scheme Access Kit
        </Link>
      </body>
    </html>
  );
}
