import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create exam categories
  const categories = await Promise.all([
    prisma.examCategory.create({
      data: {
        name: 'Civil Services',
        description: 'UPSC, State PSC, and other civil service examinations',
        icon: 'government',
        color: 'bg-blue-100 text-blue-800'
      }
    }),
    prisma.examCategory.create({
      data: {
        name: 'Banking',
        description: 'Bank PO, Clerk, and other banking sector exams',
        icon: 'bank',
        color: 'bg-green-100 text-green-800'
      }
    }),
    prisma.examCategory.create({
      data: {
        name: 'Railway',
        description: 'RRB and other railway recruitment exams',
        icon: 'train',
        color: 'bg-purple-100 text-purple-800'
      }
    }),
    prisma.examCategory.create({
      data: {
        name: 'Defense',
        description: 'NDA, CDS, and other defense services exams',
        icon: 'shield',
        color: 'bg-red-100 text-red-800'
      }
    }),
    prisma.examCategory.create({
      data: {
        name: 'Teaching',
        description: 'CTET, UGC NET, and other teaching exams',
        icon: 'book',
        color: 'bg-yellow-100 text-yellow-800'
      }
    }),
    prisma.examCategory.create({
      data: {
        name: 'Engineering',
        description: 'GATE, ESE, and other engineering exams',
        icon: 'gear',
        color: 'bg-indigo-100 text-indigo-800'
      }
    })
  ]);

  // Create sample exams
  const exams = await Promise.all([
    prisma.exam.create({
      data: {
        title: 'UPSC Civil Services Examination',
        description: 'Preliminary and Main examination for Indian Administrative Services',
        categoryId: categories[0].id,
        examType: 'government',
        level: 'advanced',
        duration: 180,
        totalMarks: 400,
        passingMarks: 200,
        examDate: new Date('2024-06-16'),
        lastDateToApply: new Date('2024-03-05'),
        officialWebsite: 'https://upsc.gov.in',
        eligibility: 'Bachelor degree from recognized university',
        pattern: 'Preliminary + Main + Interview',
        syllabus: 'General Studies, CSAT, Optional Subjects'
      }
    }),
    prisma.exam.create({
      data: {
        title: 'IBPS PO Examination',
        description: 'Probationary Officer recruitment for public sector banks',
        categoryId: categories[1].id,
        examType: 'banking',
        level: 'intermediate',
        duration: 120,
        totalMarks: 200,
        passingMarks: 100,
        examDate: new Date('2024-10-07'),
        lastDateToApply: new Date('2024-08-01'),
        officialWebsite: 'https://ibps.in',
        eligibility: 'Graduate in any discipline',
        pattern: 'Preliminary + Main + Interview',
        syllabus: 'Reasoning, Quantitative Aptitude, English, General Awareness'
      }
    }),
    prisma.exam.create({
      data: {
        title: 'RRB Group D Examination',
        description: 'Recruitment for various posts in Indian Railways',
        categoryId: categories[2].id,
        examType: 'railway',
        level: 'beginner',
        duration: 90,
        totalMarks: 100,
        passingMarks: 40,
        examDate: new Date('2024-08-17'),
        lastDateToApply: new Date('2024-06-12'),
        officialWebsite: 'https://rrbcdg.gov.in',
        eligibility: '10th pass or ITI',
        pattern: 'Computer Based Test',
        syllabus: 'Mathematics, General Intelligence, General Science, General Awareness'
      }
    })
  ]);

  // Create sample study materials
  const materials = await Promise.all([
    prisma.studyMaterial.create({
      data: {
        title: 'UPSC Prelims Complete Study Package',
        description: 'Comprehensive study material for UPSC Civil Services Preliminary Examination',
        content: 'Detailed coverage of all subjects including History, Geography, Polity, Economy, Science and Technology, Environment, and Current Affairs.',
        type: 'notes',
        subject: 'General Studies',
        chapter: 'Complete Syllabus',
        difficulty: 'advanced',
        examId: exams[0].id
      }
    }),
    prisma.studyMaterial.create({
      data: {
        title: 'Banking Awareness Complete Guide',
        description: 'Essential banking awareness material for IBPS and other banking exams',
        content: 'Complete coverage of Indian banking system, financial institutions, monetary policy, and current banking trends.',
        type: 'notes',
        subject: 'Banking Awareness',
        chapter: 'Financial System',
        difficulty: 'intermediate',
        examId: exams[1].id
      }
    })
  ]);

  // Create sample jobs
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: 'Junior Administrative Assistant',
        company: 'Ministry of Home Affairs',
        location: 'New Delhi',
        description: 'Looking for a motivated Junior Administrative Assistant to support daily administrative operations and office management tasks.',
        requirements: 'Bachelor degree in any discipline, Basic computer knowledge, Good communication skills',
        salary: '₹25,000 - ₹35,000 per month',
        jobType: 'government',
        category: 'Administrative',
        deadline: new Date('2024-02-15'),
        applicationUrl: 'https://gov.in/jobs/jaa-2024'
      }
    }),
    prisma.job.create({
      data: {
        title: 'Probationary Officer',
        company: 'State Bank of India',
        location: 'Mumbai',
        description: 'SBI is recruiting Probationary Officers for various branches across India. Excellent career growth opportunities.',
        requirements: 'Graduate in any discipline with 60% marks, Age 21-30 years, Basic computer knowledge',
        salary: '₹42,000 - ₹56,000 per month',
        jobType: 'government',
        category: 'Banking',
        deadline: new Date('2024-03-01'),
        applicationUrl: 'https://sbi.co.in/careers'
      }
    }),
    prisma.job.create({
      data: {
        title: 'Software Engineer',
        company: 'National Informatics Centre',
        location: 'Bangalore',
        description: 'NIC is looking for talented Software Engineers to work on various e-governance projects.',
        requirements: 'B.Tech/M.Tech in Computer Science, 2+ years experience, Knowledge of Java/Python',
        salary: '₹60,000 - ₹80,000 per month',
        jobType: 'government',
        category: 'IT',
        deadline: new Date('2024-02-28'),
        applicationUrl: 'https://nic.in/careers'
      }
    })
  ]);

  // Create sample interview questions
  const interviewQuestions = await Promise.all([
    prisma.interviewQuestion.create({
      data: {
        question: 'Tell me about yourself.',
        answer: 'Provide a brief introduction covering your educational background, work experience, key skills, and career goals. Keep it concise and relevant to the job you are applying for.',
        category: 'hr',
        difficulty: 'easy',
        jobType: 'government'
      }
    }),
    prisma.interviewQuestion.create({
      data: {
        question: 'Why do you want to work in the government sector?',
        answer: 'Mention job security, opportunity to serve the nation, work-life balance, and the chance to contribute to public service. Show genuine interest in public service.',
        category: 'hr',
        difficulty: 'medium',
        jobType: 'government'
      }
    }),
    prisma.interviewQuestion.create({
      data: {
        question: 'What are your strengths and weaknesses?',
        answer: 'Highlight 2-3 relevant strengths with examples. For weaknesses, mention areas you are actively working to improve and show self-awareness.',
        category: 'hr',
        difficulty: 'medium',
        jobType: 'government'
      }
    })
  ]);

  console.log('Database seeded successfully!');
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${exams.length} exams`);
  console.log(`Created ${materials.length} study materials`);
  console.log(`Created ${jobs.length} jobs`);
  console.log(`Created ${interviewQuestions.length} interview questions`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });