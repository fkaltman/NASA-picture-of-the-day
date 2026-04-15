"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ApodData = {
  title: string;
  url: string;
  date: string;
};

export default function ApodGrid({ items }: { items: ApodData[] }) {
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("viewedApods") || "[]");
    setViewed(new Set(stored));
    
    // Listen for storage changes from other tabs/windows
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("viewedApods") || "[]");
      setViewed(new Set(updated));
    };
    
    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event from same window
    window.addEventListener("viewedUpdate", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("viewedUpdate", handleStorageChange);
    };
  }, []);

  function handleClear() {
    localStorage.removeItem("viewedApods");
    setViewed(new Set());
  }

  return (
    <>
      {viewed.size > 0 && (
        <button
          onClick={handleClear}
          className="mb-6 text-sm text-gray-400 hover:text-white transition-colors"
        >
          Clear viewed
        </button>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((apod) => (
        <Link
          key={apod.date}
          href={`/apod/${apod.date}`}
          className="rounded-lg overflow-hidden bg-gray-900 hover:bg-gray-800 transition-colors"
        >
          <div className="relative">
            <Image
              src={apod.url}
              alt={apod.title}
              width={400}
              height={300}
              className={`w-full h-48 object-cover ${viewed.has(apod.date) ? "opacity-50" : ""}`}
            />
            {viewed.has(apod.date) && (
              <span className="absolute top-2 right-2 bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">
                Viewed
              </span>
            )}
          </div>
          <div className="p-4">
            <h2 className="font-semibold mb-1 line-clamp-1">{apod.title}</h2>
            <p className="text-sm text-gray-400">{apod.date}</p>
          </div>
        </Link>
      ))}
    </div>
    </>
  );
}
