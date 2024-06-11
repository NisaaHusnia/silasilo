import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { addData, getData, getDataByField } from "@/lib/firebase/service";

export async function GET(request: NextRequest) {
  try {
    const id: any = request.url.split("/").pop();

    const data = await getDataByField("farms", "user_id", id);
    return NextResponse.json(
      {
        success: true,
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");
    const id: any = request.url.split("/").pop();

    if (decoded) {
      const data = await request.json();

      data["user_id"] = id;

      const status = await addData("farms", data);
      if (status) {
        return NextResponse.json(
          {
            success: true,
            message: "Berhasil menambahkan proses",
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Gagal menambahkan proses",
          },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Maaf, anda tidak memiliki akses!",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
