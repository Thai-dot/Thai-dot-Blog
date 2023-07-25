import { db } from "@/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  const url = new URL(req.url);

  try {
    const { limit, page, title } = z
      .object({
        limit: z.string(),
        page: z.string(),
        title: z.string().nullish().optional(),
      })
      .parse({
        title: url.searchParams.get("title"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
      });

    if (parseInt(limit) > 50) {
      throw new Error("limit length is too much!");
    }

    let whereClause = {};

    if (title) {
      whereClause = {
        title: {
          contains: title,
        },
      };
    }

    const posts = await db.post.findMany({
      take: Number(limit) ?? null,
      skip: (Number(page) - 1) * Number(limit) ?? 0,
      orderBy: {
        createAt: "desc",
      },
      include: {
        author: true,
      },
      where: whereClause,
    });

    const totalPost = await db.post.count();

    return NextResponse.json({
      data: posts,
      totalPost,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Could not fetch posts", { status: 500 });
  }
};
