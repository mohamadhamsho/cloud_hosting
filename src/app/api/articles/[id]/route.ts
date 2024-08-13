import prisma from "@/utils/db";
import { UpdateArticleDataTransferObject } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

/**
 * @method          GET
 * @route           ~/api/articles/:id
 * @description     Get Single Article By ID
 * @access          public
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * @method          Put
 * @route           ~/api/articles/:id
 * @description     Update Article By ID
 * @access          public
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }
    const body = (await request.json()) as UpdateArticleDataTransferObject;

    const updatedArticle = await prisma.article.update({
      where: { id: parseInt(params.id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
/**
 * @method          Delete
 * @route           ~/api/articles/:id
 * @description     Delete Article By ID
 * @access          public
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!article) {
      return NextResponse.json(
        { message: "Article not found" },
        { status: 404 }
      );
    }

    await prisma.article.delete({ where: { id: parseInt(params.id) } });

    return NextResponse.json({ message: "article deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
