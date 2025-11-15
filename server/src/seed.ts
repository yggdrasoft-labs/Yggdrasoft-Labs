import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Domain from './models/Domain';
import Project from './models/Project';
import Settings from './models/Settings';
import { Review } from './models/Review';
import { Blog } from './models/Blog';
import { Admin } from './models/Admin';

dotenv.config();

const domains = [
  {
    name: 'Technology',
    slug: 'technology',
    description:
      'Pioneering innovative software solutions and digital platforms that transform how businesses operate. From AI-powered applications to blockchain implementations, we develop cutting-edge technology that solves real-world problems and drives digital transformation across industries.',
    icon: 'FaLaptopCode',
    hasActiveProjects: true,
    order: 1,
    isActive: true,
  },
  {
    name: 'Agriculture',
    slug: 'agriculture',
    description:
      'Revolutionizing farming through smart agriculture solutions and sustainable practices. We combine IoT sensors, data analytics, and modern farming techniques to increase crop yields, optimize resource usage, and promote environmentally friendly agricultural methods that feed communities.',
    icon: 'FaSeedling',
    hasActiveProjects: true,
    order: 2,
    isActive: true,
  },
  {
    name: 'Education',
    slug: 'education',
    description:
      'Empowering learners through accessible, innovative educational platforms and programs. We create digital learning environments, develop curriculum, and provide resources that make quality education available to everyone, bridging gaps and fostering lifelong learning opportunities.',
    icon: 'FaGraduationCap',
    hasActiveProjects: false,
    order: 3,
    isActive: true,
  },
  {
    name: 'Stock Markets',
    slug: 'stock-markets',
    description:
      'Developing intelligent trading platforms and financial analysis tools that democratize investment opportunities. Our solutions provide real-time market insights, algorithmic trading capabilities, and risk management tools that help investors make informed decisions in dynamic markets.',
    icon: 'FaChartLine',
    hasActiveProjects: true,
    order: 4,
    isActive: true,
  },
  {
    name: 'Job Markets',
    slug: 'job-markets',
    description:
      'Connecting talent with opportunity through innovative recruitment and career development platforms. We build systems that match skills with needs, provide career guidance, and create pathways for professional growth, helping individuals and organizations thrive together.',
    icon: 'FaBriefcase',
    hasActiveProjects: false,
    order: 5,
    isActive: true,
  },
  {
    name: 'Healthcare',
    slug: 'healthcare',
    description:
      'Advancing medical care through digital health solutions and telemedicine platforms. We develop patient management systems, health monitoring applications, and medical data analytics tools that improve healthcare delivery, enhance patient outcomes, and make quality care more accessible.',
    icon: 'FaHeartbeat',
    hasActiveProjects: true,
    order: 6,
    isActive: true,
  },
];

const projects = [
  {
    title: 'AI-Powered Analytics Platform',
    description:
      'A comprehensive analytics platform leveraging artificial intelligence to provide real-time insights and predictive analytics for businesses. Features include automated data processing, machine learning models, and interactive dashboards that help organizations make data-driven decisions.',
    technologies: ['React', 'TypeScript', 'Python', 'TensorFlow', 'MongoDB'],
    imageUrl: '/projects/ai-analytics.jpg',
    githubUrl: 'https://github.com/yggrasoft-labs/ai-analytics',
    liveUrl: 'https://analytics.yggrasoft.com',
    featured: true,
    order: 1,
    isActive: true,
  },
  {
    title: 'Smart Farm Management System',
    description:
      'An IoT-enabled farm management solution that monitors soil conditions, weather patterns, and crop health in real-time. Farmers can optimize irrigation, predict harvest times, and reduce resource waste through intelligent automation and data-driven recommendations.',
    technologies: ['Node.js', 'React Native', 'IoT', 'PostgreSQL', 'AWS'],
    imageUrl: '/projects/smart-farm.jpg',
    githubUrl: 'https://github.com/yggrasoft-labs/smart-farm',
    featured: true,
    order: 2,
    isActive: true,
  },
  {
    title: 'Blockchain Trading Platform',
    description:
      'A secure and transparent trading platform built on blockchain technology. Enables peer-to-peer trading with smart contracts, real-time market data, and advanced risk management tools. Features include automated trading bots and portfolio analytics.',
    technologies: ['Solidity', 'Web3.js', 'React', 'Node.js', 'Ethereum'],
    imageUrl: '/projects/blockchain-trading.jpg',
    githubUrl: 'https://github.com/yggrasoft-labs/blockchain-trading',
    liveUrl: 'https://trade.yggrasoft.com',
    featured: true,
    order: 3,
    isActive: true,
  },
  {
    title: 'Telemedicine Platform',
    description:
      'A comprehensive healthcare platform connecting patients with medical professionals through secure video consultations, digital prescriptions, and health record management. Includes appointment scheduling, payment processing, and integration with medical devices.',
    technologies: ['Vue.js', 'Django', 'WebRTC', 'PostgreSQL', 'Docker'],
    imageUrl: '/projects/telemedicine.jpg',
    githubUrl: 'https://github.com/yggrasoft-labs/telemedicine',
    featured: false,
    order: 4,
    isActive: true,
  },
  {
    title: 'E-Learning Management System',
    description:
      'An interactive learning platform with course creation tools, video streaming, assessments, and progress tracking. Supports multiple learning formats including live classes, recorded lectures, and interactive quizzes with AI-powered personalized learning paths.',
    technologies: ['Angular', 'Spring Boot', 'MySQL', 'Redis', 'Kubernetes'],
    imageUrl: '/projects/elearning.jpg',
    githubUrl: 'https://github.com/yggrasoft-labs/elearning',
    liveUrl: 'https://learn.yggrasoft.com',
    featured: false,
    order: 5,
    isActive: true,
  },
  {
    title: 'Job Matching AI Engine',
    description:
      'An intelligent job matching system using machine learning to connect job seekers with opportunities based on skills, experience, and career goals. Features include resume parsing, skill gap analysis, and personalized job recommendations.',
    technologies: ['Python', 'FastAPI', 'React', 'NLP', 'MongoDB'],
    imageUrl: '/projects/job-matching.jpg',
    githubUrl: 'https://github.com/yggrasoft-labs/job-matching',
    featured: false,
    order: 6,
    isActive: true,
  },
];

const settings = {
  siteName: 'Yggrasoft Labs',
  tagline: 'Connecting Realms of Innovation',
  missionStatement:
    'At Yggrasoft Labs, we are dedicated to developing, funding, and deploying real-world solutions across multiple domains. Inspired by Yggdrasil, the World Tree from Norse mythology, we connect different realms of innovation to create sustainable impact in technology, agriculture, education, finance, employment, and healthcare.',
  contactEmail: 'contact@yggrasoft.com',
  socialMedia: {
    twitter: 'https://twitter.com/yggrasoftlabs',
    linkedin: 'https://linkedin.com/company/yggrasoft-labs',
    github: 'https://github.com/yggrasoft-labs',
  },
};

const reviews = [
  {
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechVentures Inc',
    rating: 5,
    review: 'Yggrasoft Labs delivered an exceptional AI analytics platform that transformed our business intelligence capabilities. Their technical expertise and commitment to quality are unmatched.',
    avatar: '',
    isActive: true,
    order: 1,
  },
  {
    name: 'Michael Chen',
    role: 'Farm Owner',
    company: 'Green Valley Farms',
    rating: 5,
    review: 'The smart farm management system has revolutionized how we operate. We\'ve seen a 40% increase in efficiency and significant cost savings. Highly recommended!',
    avatar: '',
    isActive: true,
    order: 2,
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Medical Director',
    company: 'HealthFirst Clinic',
    rating: 5,
    review: 'The telemedicine platform has made healthcare more accessible to our patients. The system is intuitive, secure, and has greatly improved our service delivery.',
    avatar: '',
    isActive: true,
    order: 3,
  },
  {
    name: 'David Thompson',
    role: 'Investment Manager',
    company: 'Capital Growth Partners',
    rating: 5,
    review: 'Their blockchain trading platform provides the security and transparency we need. The real-time analytics and automated features have given us a competitive edge.',
    avatar: '',
    isActive: true,
    order: 4,
  },
];

const blogs = [
  {
    title: 'The Future of AI in Business Analytics',
    slug: 'future-of-ai-in-business-analytics',
    excerpt: 'Exploring how artificial intelligence is transforming the way businesses analyze data and make decisions.',
    content: 'Artificial Intelligence is revolutionizing business analytics by enabling organizations to process vast amounts of data in real-time, identify patterns that humans might miss, and make predictions with unprecedented accuracy...',
    coverImage: '',
    author: 'Yggrasoft Labs Team',
    tags: ['AI', 'Analytics', 'Technology', 'Business'],
    isPublished: true,
    publishedAt: new Date('2024-11-01'),
    views: 1250,
  },
  {
    title: 'Smart Agriculture: Feeding the Future',
    slug: 'smart-agriculture-feeding-the-future',
    excerpt: 'How IoT and data analytics are revolutionizing modern farming practices.',
    content: 'Smart agriculture combines IoT sensors, satellite imagery, and data analytics to optimize crop yields while minimizing environmental impact...',
    coverImage: '',
    author: 'Yggrasoft Labs Team',
    tags: ['Agriculture', 'IoT', 'Sustainability', 'Innovation'],
    isPublished: true,
    publishedAt: new Date('2024-10-15'),
    views: 890,
  },
  {
    title: 'Blockchain Beyond Cryptocurrency',
    slug: 'blockchain-beyond-cryptocurrency',
    excerpt: 'Discovering the practical applications of blockchain technology in various industries.',
    content: 'While blockchain is often associated with cryptocurrency, its potential extends far beyond digital currencies...',
    coverImage: '',
    author: 'Yggrasoft Labs Team',
    tags: ['Blockchain', 'Technology', 'Finance', 'Innovation'],
    isPublished: true,
    publishedAt: new Date('2024-10-01'),
    views: 1450,
  },
];

const admin = {
  username: 'admin',
  email: 'admin@yggrasoft.com',
  password: 'admin123', // Will be hashed by the model
  role: 'superadmin',
  isActive: true,
};

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yggdrasil';
    await mongoose.connect(mongoURI);

    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Domain.deleteMany({});
    await Project.deleteMany({});
    await Settings.deleteMany({});
    await Review.deleteMany({});
    await Blog.deleteMany({});
    await Admin.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Insert domains
    await Domain.insertMany(domains);
    console.log('✅ Seeded domains');

    // Insert projects
    await Project.insertMany(projects);
    console.log('✅ Seeded projects');

    // Insert settings
    await Settings.create(settings);
    console.log('✅ Seeded settings');

    // Insert reviews
    await Review.insertMany(reviews);
    console.log('✅ Seeded reviews');

    // Insert blogs
    await Blog.insertMany(blogs);
    console.log('✅ Seeded blogs');

    // Create admin user
    await Admin.create(admin);
    console.log('✅ Created admin user (username: admin, password: admin123)');

    console.log('🌳 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
