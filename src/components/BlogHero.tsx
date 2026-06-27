import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { type Blog } from '../services/blogService';
import './BlogHero.css';

interface BlogHeroProps {
  blog: Blog;
}

export default function BlogHero({ blog }: BlogHeroProps) {
  const formattedDate = new Date(blog.publishedDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="blog-hero">
      <div className="blog-hero-top">
        <Link to="/" className="blog-back-link">
          <ArrowLeft size={16} />
          <span>Back to Insights</span>
        </Link>
      </div>
      <div className="blog-hero-container">
        <div className="blog-hero-content">
          <span className="blog-hero-category">{blog.category}</span>
          <h1 className="blog-hero-title">{blog.title}</h1>
          <div className="blog-hero-meta">
            <span className="blog-hero-date">
              <Calendar size={16} />
              {formattedDate}
            </span>
            <span className="blog-hero-read-time">
              <Clock size={16} />
              {blog.readTime}
            </span>
          </div>
        </div>
      </div>
      <div className="blog-hero-image-wrapper">
        <img src={blog.featuredImage} alt={blog.title} className="blog-hero-image" />
      </div>
    </header>
  );
}
