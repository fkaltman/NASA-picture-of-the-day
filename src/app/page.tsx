import Image from "next/image";
import Link from "next/link";

type ApodData = {
  title: string;
  explanation: string;
  url: string;
  hdurl: string;
  date: string;
  media_type: string;
};

export default async function Home() {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 20);

  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${start.toISOString().split("T")[0]}&end_date=${end.toISOString().split("T")[0]}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return (
      <main className="min-h-screen bg-black text-white p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">NASA Picture of the Day</h1>
        <p className="text-gray-400">NASA API is temporarily unavailable. Please try again later.</p>
      </main>
    );
  }

  const allData: ApodData[] = await res.json();
  const data = allData.filter((apod) => apod.media_type === "image").slice(-9);

  return (
    <main className="min-h-screen bg-black text-white p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">NASA Picture of the Day</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((apod) => (
          <Link
            key={apod.date}
            href={`/apod/${apod.date}`}
            className="rounded-lg overflow-hidden bg-gray-900 hover:bg-gray-800 transition-colors"
          >
            <Image
              src={apod.url}
              alt={apod.title}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-semibold mb-1 line-clamp-1">{apod.title}</h2>
              <p className="text-sm text-gray-400">{apod.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
