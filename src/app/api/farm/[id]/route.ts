import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { addData, getDataByField } from "@/lib/firebase/service";
import { addDataRealtime, getDataRealtime } from "@/lib/firebase/serviceRealtime";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const data: any = await getDataByField("farms", "user_id", params.id);

    const mergedData = await Promise.all(
      data.map(async (farm: any) => {
        const dataRealtime = await getDataRealtime(farm.id);
        return { ...farm, ...dataRealtime };
      })
    );

    return NextResponse.json(
      {
        success: true,
        data: mergedData,
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

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token: any = request.headers.get("authorization")?.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.NEXTAUTH_SECRET || "");

    if (decoded) {
      const data = await request.json();

      data["user_id"] = params.id;

      const dataRealtime = {
        temperature: 0,
        ph: 0,
        humadity: 0,
      };

      const result: any = await addData("farms", data);
      const statusRealtime = await addDataRealtime(result.id, dataRealtime);

      if (result && statusRealtime) {
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
