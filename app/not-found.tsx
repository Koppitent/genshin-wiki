import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[80vh] flex flex-col items-center justify-center gap-4">
			<h1 className="text-8xl font-bold text-red-500 ">404</h1>
      <h2 className="text-4xl font-bold text-red-500 ">Not Found</h2>
      <p className="text-xl ">
        Diese Seite existiert wohl nicht (mehr).
      </p>
      <Link href="/" className="text-lg bg-[var(--button-bg)] hover:bg-[var(--button-bg-hover)] text-white px-4 py-2 rounded-md transition-colors">
        Return Home
      </Link>
    </div>
  );
}
