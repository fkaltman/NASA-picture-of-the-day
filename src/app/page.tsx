import Image from "next/image";

type ApodData = {
  title: string;
  explanation: string;
  url: string;
  hdurl: string;
  date: string;
  media_type: string;
};

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/apod`, { cache: "no-store" });
  const data: ApodData = await res.json();

  return (
    <main className="min-h-screen bg-black text-white p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
      <p className="text-sm text-gray-400 mb-6">{data.date}</p>

      {data.media_type === "image" ? (
        <Image
          src={data.url}
          alt={data.title}
          width={960}
          height={600}
          className="w-full rounded-lg mb-6"
        />
      ) : (
        <iframe
          src={data.url}
          title={data.title}
          className="w-full aspect-video rounded-lg mb-6"
          allowFullScreen
        />
      )}

      <p className="text-gray-300 leading-relaxed">{data.explanation}</p>
    </main>
  );
}
