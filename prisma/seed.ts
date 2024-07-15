const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Users
  const user1 = await prisma.user.create({
    data: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      gender: 'Male',
      city: 'New York',
      birthday: '1990-01-01',
      password: 'password123',
    },
  })


  // Courses 
  const course1 = await prisma.courses.create({
    data: {
      title: 'Course1: Business Administration',
      description: 'Business Administration course description',
      author: 'Author 1',
      time: '10h',
      photoUrls: ['url1', 'url2'],
      modules: {
        create: [
          {
            title: 'Moddule1: Introduction to Business Administration',
            time: '2h',
            lessons: {
              create: [
                {
                  title: 'Lesson1: Create a Business Plan',
                  videoUrl: 'video_url_1',
                  time: '1h',
                },
                {
                  title: 'Lesson2: Business Administration Basics',
                  videoUrl: 'video_url_2',
                  time: '1h',
                }
              ]
            }
          },
          {
            title: 'Module2: Business Administration Advanced',
            time: '8h',
            lessons: {
              create: [
                {
                  title: 'Lesson3: Business Administration Advanced',
                  videoUrl: 'video_url_3',
                  time: '4h',
                },
                {
                  title: 'Lesson4: Business Administration Advanced 2',
                  videoUrl: 'video_url_4',
                  time: '4h',
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log({ course1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });