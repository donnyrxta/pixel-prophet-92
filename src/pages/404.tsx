export default function NotFound() {
  // Friendly 404 with recovery links.
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-600 mb-6">Let’s get you back on track.</p>
      <div className="flex gap-3 flex-wrap justify-center">
        <a className="px-4 py-2 rounded-lg bg-black text-white" href="/">
          Go home
        </a>
        <a className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900" href="/contact">
          Contact us
        </a>
      </div>
    </main>
  );
}
