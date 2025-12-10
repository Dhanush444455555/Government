import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const examType = searchParams.get('examType');
    
    let whereClause = {};
    
    if (category) {
      whereClause = { ...whereClause, category: { name: category } };
    }
    
    if (examType) {
      whereClause = { ...whereClause, examType };
    }

    const exams = await db.exam.findMany({
      where: whereClause,
      include: {
        category: true,
        _count: {
          select: {
            studyMaterials: true,
            mockTests: true,
            previousPapers: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ exams });
  } catch (error) {
    console.error('Error fetching exams:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exams' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      categoryId,
      examType,
      level,
      duration,
      totalMarks,
      passingMarks,
      examDate,
      lastDateToApply,
      officialWebsite,
      eligibility,
      pattern,
      syllabus
    } = body;

    const exam = await db.exam.create({
      data: {
        title,
        description,
        categoryId,
        examType,
        level,
        duration,
        totalMarks,
        passingMarks,
        examDate: examDate ? new Date(examDate) : null,
        lastDateToApply: lastDateToApply ? new Date(lastDateToApply) : null,
        officialWebsite,
        eligibility,
        pattern,
        syllabus
      },
      include: {
        category: true
      }
    });

    return NextResponse.json({ exam }, { status: 201 });
  } catch (error) {
    console.error('Error creating exam:', error);
    return NextResponse.json(
      { error: 'Failed to create exam' },
      { status: 500 }
    );
  }
}