import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const categories = await db.examCategory.findMany({
      where: {
        isActive: true
      },
      include: {
        _count: {
          select: {
            exams: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching exam categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exam categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, icon, color } = body;

    const category = await db.examCategory.create({
      data: {
        name,
        description,
        icon,
        color
      }
    });

    return NextResponse.json({ category }, { status: 201 });
  } catch (error) {
    console.error('Error creating exam category:', error);
    return NextResponse.json(
      { error: 'Failed to create exam category' },
      { status: 500 }
    );
  }
}