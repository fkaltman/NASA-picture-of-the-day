import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  const apiKey = process.env.NASA_API_KEY || "DEMO_KEY";
  const nasaUrl = new URL("https://api.nasa.gov/planetary/apod");
  nasaUrl.searchParams.set("api_key", apiKey);

  if (date) {
    nasaUrl.searchParams.set("date", date);
  } else {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 8);
    nasaUrl.searchParams.set("start_date", start.toISOString().split("T")[0]);
    nasaUrl.searchParams.set("end_date", end.toISOString().split("T")[0]);
  }

  const res = await fetch(nasaUrl.toString());
  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch APOD" }, { status: 500 });
  }

  return NextResponse.json(data);
}
