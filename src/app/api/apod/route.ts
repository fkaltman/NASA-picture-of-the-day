import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
  );
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch APOD" }, { status: 500 });
  }

  return NextResponse.json(data);
}
