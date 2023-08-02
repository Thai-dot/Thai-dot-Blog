import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import ApiResponseType from "@/types/type/ApiResponse";
import { getAuthSession } from "@/lib/auth";
import { PostValidator } from "@/lib/validator/post";

export const GET = async (req: Request) => {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  const session = await getAuthSession();
  try {
    if (!session?.user) {
      return new Response("unauthorized", { status: 401 });
    }

    const post = await db.post.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        author: true,
      },
    });

    if (post?.authorId === session.user.id || session.user.role === "admin") {
      const res: ApiResponseType<typeof post> = {
        status: "success",
        data: post,
        code: 200,
        timestamp: new Date(),
      };

      return NextResponse.json(res);
    } else {
      return new Response("have no rights to access", { status: 403 });
    }
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

export const PUT = async (req: Request) => {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  const session = await getAuthSession();

  try {
    if (!session?.user) {
      return new Response("unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { title, content, readMinute, description, image } =
      PostValidator.parse(body);

    const post = await db.post.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
      include: {
        author: true,
      },
    });

    if (post?.authorId === session.user.id) {
      const returnPost = await db.post.update({
        where: {
          id: id,
        },
        data: {
          title,
          content,
          readMinute,
          description: description?.toString(),
          image,
        },
      });

      return new Response("update successfully", { status: 200 });
    } else {
      return new Response("have no rights to access", { status: 403 });
    }
  } catch (error) {
    console.log("update error: ",error);

    const res: ApiResponseType<string> = {
      status: "error",
      code: 500,
      timestamp: new Date(),
      message: "Could not update posts",
    };
    return new Response(JSON.stringify(res), { status: 500 });
  }
};


// for admin only
export const PATCH = async (req: Request) => {
  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  const session = await getAuthSession();

  try {
    if (!session?.user) {
      return new Response("unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { booleanValue } = body;


    if (session?.user?.role === 'admin') {
      const returnPost = await db.post.update({
        where: {
          id: id,
        },
        data: {
          isVerified: booleanValue
        },
      });

      return new Response("patch admin successfully", { status: 200 });
    } else {
      return new Response("have no rights to access", { status: 403 });
    }
  } catch (error) {
    console.log("patch admin error: ", error);

    const res: ApiResponseType<string> = {
      status: "error",
      code: 500,
      timestamp: new Date(),
      message: "Could not update posts",
    };
    return new Response(JSON.stringify(res), { status: 500 });
  }
};


