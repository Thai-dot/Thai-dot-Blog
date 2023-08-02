import { db } from "@/lib/db";
import { z } from "zod";
import { NextResponse } from "next/server";
import ApiResponseType from "@/types/type/ApiResponse";
import { getAuthSession } from "@/lib/auth";
import { PostValidator } from "@/lib/validator/post";

export const GET = async (req: Request) => {
  const url = new URL(req.url);

  try {
    const { limit, page, title, categories, userId, showNotVerified } = z
      .object({
        limit: z.string(),
        page: z.string(),
        title: z.string().nullish().optional(),
        categories: z.string().nullish().optional(),
        userId: z.string().nullish().optional(),
        showNotVerified: z.string().nullish().optional(),
      })
      .parse({
        title: url.searchParams.get("title"),
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        categories: url.searchParams.get("categories"),
        userId: url.searchParams.get("userId"),
        showNotVerified: url.searchParams.get("showNot"),
      });

    if (parseInt(limit) > 50) {
      throw new Error("limit length is too much!");
    }

    const isShowNotVerified = showNotVerified === "yes" ? true : false;

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

    if (!isShowNotVerified) {
      whereClause = {
        ...whereClause,
        isVerified: {
          equals: true,
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
      },
    });

    const totalRow = await db.post.count({
      where: {
        ...whereClause,
  
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

export async function DELETE(req: Request) {
  const session = await getAuthSession();
  try {
    if (!session?.user) {
      return new Response("unauthorized", { status: 401 });
    }

    const { deleteArray } = await req.json();

    const findIdAuthor = await db.post.findMany({
      where: {
        id: {
          in: deleteArray,
        },
      },
    });

    if (!findIdAuthor.every((post) => post.authorId === session.user.id)) {
      return new Response("can not has rights to delete", { status: 403 });
    }

    if (deleteArray?.length > 0) {
      await db.post.deleteMany({
        where: {
          id: {
            in: deleteArray,
          },
        },
      });
    } else {
      throw new Error("Can not find any delete array");
    }

    return new Response(JSON.stringify("delete successfully"), { status: 200 });
  } catch (error) {
    console.log(error);
    const res: ApiResponseType<string> = {
      status: "error",
      code: 500,
      timestamp: new Date(),
      message: "failed to delete some posts",
    };
    return new Response(JSON.stringify(res), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { title, content, readMinute, description, image } =
      PostValidator.parse(body);

    await db.post.create({
      data: {
        title: title,
        description: description!,
        content: content,
        readMinute,
        image,
        authorId: session?.user?.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not post to subreddit at this time. Please try later",
      { status: 500 }
    );
  }
}
