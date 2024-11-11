import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const catalogNumber = searchParams.get("catalogNumber");

    if (!catalogNumber) {
      return NextResponse.json({
        status: 400,
        error: "Catalog number is required",
      });
    }

    const baseUrl = `https://petzold-filebrowser.bidsvio.online/files/srv/auction-1645/`;
    const maxImages = 10;
    const imageUrls = [];

    // Генерируем массив URL без проверки их существования
    for (let i = 0; i < maxImages; i++) {
      const url = `${baseUrl}${catalogNumber}${i > 0 ? `_${i}` : ""}.jpg`;
      imageUrls.push(url);
    }

    return NextResponse.json(imageUrls, { status: 200 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({
      status: 500,
      error,
    });
  }
}
