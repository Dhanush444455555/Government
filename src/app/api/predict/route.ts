import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { gpa, studyHours, mockScore, attempts } = body;

        // Simulate ML Processing delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock Algo: 
        // Base score from Mock Test (50% weight) + Study Hours (30% weight) + GPA (20% weight)
        // Penalize slightly for attempts > 2

        const mockWeight = (Number(mockScore) / 100) * 50;
        const hoursWeight = (Math.min(Number(studyHours), 12) / 12) * 30;
        const gpaWeight = ((Number(gpa) / 10) * 20);

        let probability = mockWeight + hoursWeight + gpaWeight;

        if (attempts > 2) {
            probability -= 5;
        }

        probability = Math.min(Math.max(Math.round(probability), 10), 99); // Clamp between 10 and 99

        return NextResponse.json({ probability });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
