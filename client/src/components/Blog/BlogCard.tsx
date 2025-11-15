import { motion } from 'framer-motion';
import { FaCalendar, FaEye, FaArrowRight } from 'react-icons/fa';
import { LazyImage } from '../shared/LazyImage';

interface BlogCardProps {
  blog: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage?: string;
    author: string;
    tags: string[];
    publishedAt: string;
    views: number;
  };
  index: number;
}

export const BlogCard = ({ blog, index }: BlogCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-background-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden">
        {blog.coverImage ? (
          <LazyImage
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
            <span className="text-4xl font-bold text-white opacity-50">
              {blog.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-accent-primary/20 text-accent-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-accent-primary transition-colors">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-text-secondary mb-4 line-clamp-3">{blog.excerpt}</p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FaCalendar className="text-xs" />
              {formatDate(blog.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <FaEye className="text-xs" />
              {blog.views}
            </span>
          </div>
        </div>

        {/* Read More Link */}
        <a
          href={`/blog/${blog.slug}`}
          className="inline-flex items-center gap-2 text-accent-primary font-medium hover:gap-3 transition-all"
        >
          Read More
          <FaArrowRight className="text-sm" />
        </a>
      </div>
    </motion.article>
  );
};
