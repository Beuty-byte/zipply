// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center px-4 max-w-md">
                <div className="text-7xl font-extrabold text-[#007BFF] mb-4">404</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h1>
                <p className="text-gray-500 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 bg-[#007BFF] text-white font-semibold rounded-xl hover:bg-[#0056CC] transition-colors"
                    >
                        Go to Homepage
                    </Link>
                    <Link
                        href="/en/compress/jpeg"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Compress JPEG
                    </Link>
                </div>
            </div>
        </div>
    );
}