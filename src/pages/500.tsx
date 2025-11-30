export default function ServerError() {
  // User-friendly 500 page with recovery actions.
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-2">Something went wrong</h1>
      <p className="text-gray-600 mb-6">We logged the issue. Try again or reach out.</p>
      <div className="flex gap-3 flex-wrap justify-center">
        <a className="px-4 py-2 rounded-lg bg-black text-white" href="/">
          Retry home
        </a>
        <a className="px-4 py-2 rounded-lg bg-gray-100 text-gray-900" href="/contact">
          Contact support
        </a>
      </div>
    </main>
  );
}
