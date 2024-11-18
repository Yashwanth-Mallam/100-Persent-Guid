import { faker } from '@faker-js/faker';
import Course from './models/courseModel'; // Adjust path to your Course model

// Define the getCategoryCoverImage function
const getCategoryCoverImage = (category) => {
  const categoryImages = {
    Programming: 'https://example.com/images/programming.jpg',
    Design: 'https://example.com/images/design.jpg',
    Marketing: 'https://example.com/images/marketing.jpg',
    Business: 'https://example.com/images/business.jpg',
  };

  return categoryImages[category] || 'https://example.com/images/default.jpg';
};

const createDummyCourses = async () => {
  const dummyCourses = Array.from({ length: 10 }, () => {
    const category = faker.helpers.arrayElement(['Programming', 'Design', 'Marketing', 'Business']);
    
    return {
      category,
      courseTitle: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      uploadedBy: faker.internet.email(),
      uploadedAt: faker.date.past(),
      coverImage: getCategoryCoverImage(category), // Assign image based on category
      tutor: {
        avatar: faker.image.avatar(),
        name: faker.name.fullName(),
      },
    };
  });

  await Course.insertMany(dummyCourses);
  console.log('Dummy courses created successfully.');
};

export default createDummyCourses;
