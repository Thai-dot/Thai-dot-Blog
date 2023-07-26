import { db } from "@/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";
import ApiResponseType from "@/types/type/ApiResponse";

export const GET = async (req: Request) => {
  const url = new URL(req.url);

  try {
    const { limit, page, title, categories, userId } = z
      .object({
        limit: z.string(),
        page: z.string(),
        title: z.string().nullish().optional(),
        categories: z.string().nullish().optional(),
        userId: z.string().nullish().optional(),
      })
      .parse({
        title: url.searchParams.get("title"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        categories: url.searchParams.get("categories"),
        userId: url.searchParams.get("userId"),
      });

    if (parseInt(limit) > 50) {
      throw new Error("limit length is too much!");
    }

    let whereClause = {};

    if (title) {
      whereClause = {
        ...whereClause,
        title: {
          contains: title,
        },
      };
    }

    if (categories) {
      whereClause = {
        ...whereClause,
        type: {
          in: categories.split(","),
        },
      };
    }

    if (userId) {
      whereClause = {
        ...whereClause,
        authorId: {
          equals: userId,
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
      where: {
        ...whereClause,
        isVerified: {
          equals: true,
        },
      },
    });

    const totalRow = await db.post.count({
      where: {
        ...whereClause,
        isVerified: {
          equals: true,
        },
      },
    });

    const res: ApiResponseType<typeof posts> & {
      totalRow: number | string;
      totalPage: number;
    } = {
      status: "success",
      data: posts,
      code: 200,
      timestamp: new Date(),
      totalRow: totalRow,
      totalPage: Math.ceil(Number(totalRow) / Number(limit)),
    };

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);

    const res: ApiResponseType<string> = {
      status: "error",
      code: 500,
      timestamp: new Date(),
      message: "Could not fetch posts",
    };
    return new Response(JSON.stringify(res), { status: 500 });
  }
};
