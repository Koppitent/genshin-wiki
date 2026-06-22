"use client";

export default function AccessDenied() {
	return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-lg text-red-100">
        You do not have permission to access this page.
      </p>
    </div>
  );
}