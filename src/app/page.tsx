import ApodGrid from "./apod-grid";

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
    { next: { revalidate: 3600 } }, // Cache for 1 hour
  );

  if (!res.ok) {
    return (
      <main className="min-h-screen bg-black text-white p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">NASA Picture of the Day</h1>
        <p className="text-gray-400">
          NASA API is temporarily unavailable. Please try again later.
        </p>
      </main>
    );
  }

  const allData: ApodData[] = await res.json();
  const data = allData.filter((apod) => apod.media_type === "image").slice(-9);

  return (
    <main className="min-h-screen bg-black text-white p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">NASA Picture of the Day</h1>

      <ApodGrid items={data} />
    </main>
  );
}
