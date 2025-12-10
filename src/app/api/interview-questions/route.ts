import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const jobType = searchParams.get('jobType');
    
    let whereClause = {
      isActive: true
    };
    
    if (category) {
      whereClause = { ...whereClause, category };
    }
    
    if (difficulty) {
      whereClause = { ...whereClause, difficulty };
    }

    if (jobType) {
      whereClause = { ...whereClause, jobType };
    }

    const questions = await db.interviewQuestion.findMany({
      where: whereClause,
      orderBy: {
        createdAt: 'desc'
      },
      take: 20 // Limit to 20 questions per request
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error fetching interview questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch interview questions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      question,
      answer,
      category,
      difficulty,
      jobType
    } = body;

    const interviewQuestion = await db.interviewQuestion.create({
      data: {
        question,
        answer,
        category,
        difficulty,
        jobType
      }
    });

    return NextResponse.json({ interviewQuestion }, { status: 201 });
  } catch (error) {
    console.error('Error creating interview question:', error);
    return NextResponse.json(
      { error: 'Failed to create interview question' },
      { status: 500 }
    );
  }
}