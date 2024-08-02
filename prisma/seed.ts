import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.lessons.deleteMany();
  await prisma.modules.deleteMany();
  await prisma.courses.deleteMany();
  // Courses

  await prisma.courses.create({
    data: {
      title: 'Course1: Business Administration',
      description: 'Business Administration course description',
      author: 'Author 1',
      time: '10h',
      price: 100,
      photoUrls: ['url1', 'url2'],
      modules: {
        create: [
          {
            title: 'Moddule1: Introduction to Business Administration',
            time: '2h',
            price: 50,
            lessons: {
              create: [
                {
                  title: 'Lesson1: Create a Business Plan',
                  videoUrl: 'video_url_1',
                  time: '1h',
                  price: 0,
                },
                {
                  title: 'Lesson2: Business Administration Basics',
                  videoUrl: 'video_url_2',
                  time: '1h',
                  price: 20,
                },
              ],
            },
          },
          {
            title: 'Module2: Business Administration Advanced',
            time: '8h',
            price: 100,
            lessons: {
              create: [
                {
                  title: 'Lesson3: Business Administration Advanced',
                  videoUrl: 'video_url_3',
                  time: '4h',
                  price: 100,
                },
                {
                  title: 'Lesson4: Business Administration Advanced 2',
                  videoUrl: 'video_url_4',
                  time: '4h',
                  price: 100,
                },
              ],
            },
          },
        ],
      },
    },
  });

  // Users
  await prisma.user.create({
    data: {
      fullName: 'Rediska Kolobkovna',
      email: 'rediskakolobkovna@gmail.com',
      phoneNumber: '+998901234567',
      password: '$2a$10$UfYmSCVDFovTdfKwWjJjxenQpXVfYjfI0W7hDOcNqTKDV7kO8xRZu',
      authorized: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
