import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const jobType = searchParams.get('jobType');
    const location = searchParams.get('location');
    
    let whereClause = {
      isActive: true
    };
    
    if (category) {
      whereClause = { ...whereClause, category };
    }
    
    if (jobType) {
      whereClause = { ...whereClause, jobType };
    }

    if (location) {
      whereClause = { ...whereClause, location: { contains: location } };
    }

    const jobs = await db.job.findMany({
      where: whereClause,
      include: {
        _count: {
          select: {
            applications: true
          }
        }
      },
      orderBy: {
        postedAt: 'desc'
      }
    });

    return NextResponse.json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      company,
      location,
      description,
      requirements,
      salary,
      jobType,
      category,
      deadline,
      applicationUrl
    } = body;

    const job = await db.job.create({
      data: {
        title,
        company,
        location,
        description,
        requirements,
        salary,
        jobType,
        category,
        deadline: deadline ? new Date(deadline) : null,
        applicationUrl
      }
    });

    return NextResponse.json({ job }, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    );
  }
}